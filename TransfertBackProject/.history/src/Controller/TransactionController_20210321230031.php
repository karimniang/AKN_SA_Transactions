<?php

namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\AdminAgence;
use App\Entity\Transaction;
use App\Entity\UtilisateurAgence;
use App\Repository\ClientRepository;
use App\Repository\TransactionRepository;
use App\Services\AddUserService;
use App\Services\TwilioMessage;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api")
 */
class TransactionController extends AbstractController
{
    /**
     * @Route("/transactions/depot", name="post_depot", methods="POST")
     * @param Request $request
     * @param AddUserService $addUserService
     * @param EntityManagerInterface $manager
     * @param SerializerInterface $serializer
     * @param TransactionRepository $repoTransaction
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function makeDepot(TwilioMessage $message,ValidatorInterface $validator,Request $request,TransactionRepository $repoTransaction, AddUserService $addUserService,EntityManagerInterface $manager, SerializerInterface $serializer): JsonResponse
    {
        //dd();
        $requestTab = json_decode($request->getContent(),true);

        $userAgence = $this->getUser();
        //dd($userAgence);
        foreach ($requestTab['envoyeur'] as $key => $value) {
            if ($value =="" || $value ==" ") {
                return new JsonResponse("Veuillez renseigner le ".$key." de l'envoyeur",Response::HTTP_BAD_REQUEST);
            }
        }
        foreach ($requestTab['receveur'] as $key => $value) {
            if ($value =="" || $value ==" ") {
                return new JsonResponse("Veuillez renseigner le ".$key." du recepteur",Response::HTTP_BAD_REQUEST);
            }
        }
        if (!$requestTab['montant']) {
            return new JsonResponse("Veuillez renseigner le montant",Response::HTTP_BAD_REQUEST);
        }
        
        $envoyeur = $addUserService->buildClient($requestTab['envoyeur']);
        $receveur = $addUserService->buildClient($requestTab['receveur']);
        $compte = $userAgence->getAgence()->getCompte();



        $transaction = new Transaction();
        $transaction->setClientDepot($envoyeur);
        $transaction->setClientRetrait($receveur);
        if ($userAgence instanceof UtilisateurAgence) {
            $transaction->setUserDepot($userAgence);
        }elseif ($userAgence instanceof AdminAgence) {
            $transaction->setDepotAdminAgence($userAgence);
        }
        
        $transaction->setCompteTransaction($compte);
        $transaction->setCodeTransaction(rand(123,999)."-".rand(2111,9980)."-".rand(123,999));
        $transaction->setMontant($requestTab['montant']);
        $tax = 0;
        $montant = $requestTab['montant'];
        switch ($montant) {
            case in_array($montant,range(0,5000)):
                $tax = 425;
                break;
            case in_array($montant,range(5000,10000)):
                $tax = 850;
                break;
            case in_array($montant,range(10000,15000)):
                $tax = 1270;
                break;
            case in_array($montant,range(15000,20000)):
                $tax = 1695;
                break;
            case in_array($montant,range(20000,50000)):
                $tax = 2500;
                break;
            case in_array($montant,range(50000,60000)):
                $tax = 3000;
                break;
            case in_array($montant,range(60000,75000)):
                $tax = 4000;
                break;
            case in_array($montant,range(75000,120000)):
                $tax = 5000;
                break;
            case in_array($montant,range(120000,150000)):
                $tax = 6000;
                break;
            case in_array($montant,range(150000,200000)):
                $tax = 7000;
                break;
            case in_array($montant,range(200000,250000)):
                $tax = 8000;
                break;
            case in_array($montant,range(250000,300000)):
                $tax = 9000;
                break;
            case in_array($montant,range(300000,400000)):
                $tax = 12000;
                break;
            case in_array($montant,range(400000,750000)):
                $tax = 15000;
                break;
            case in_array($montant,range(750000,900000)):
                $tax = 22000;
                break;
            case in_array($montant,range(900000,1000000)):
                $tax = 25000;
                break;
            case in_array($montant,range(1000000,1125000)):
                $tax = 27000;
                break;
            case in_array($montant,range(1125000,2000000)):
                $tax = 30000;
                break;
            case $montant > 2000000:
                $tax = ((2/100)*$montant);
                break;
        }

        //dd($compte->getSolde());
        if ($compte->getSolde()< ($requestTab['montant'] + $tax)){
            return new JsonResponse("solde insufficient",Response::HTTP_BAD_REQUEST);
        }
        $compte->setSolde(($compte->getSolde() - ($requestTab['montant']+$tax)));
        //dd($compte->getSolde());


        $transaction->setFrais($tax);
        $transaction->setFraisDepot((10/100)*$tax);
        $transaction->setFraisEtat((40/100)*$tax);
        $transaction->setFraisRetrait((20/100)*$tax);
        $transaction->setFraisSysteme((30/100)*$tax);

        $errors = $validator->validate($transaction);
        if (($errors) > 0) {
            $errorsString = $this->serializer->serialize($errors, 'json');
            return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST, [], true);
        }

        $message->sendMessage($transaction);
        //dd($transaction);
        $manager->persist($transaction);
        $manager->flush();
        $essai = $repoTransaction->find(3);
        $transactionDone = $serializer->serialize($transaction,"json",["groups"=>["transaction:done"]]);

        return new JsonResponse($transactionDone,Response::HTTP_CREATED,[],true);

    }


    /**
     * @Route("/transactions/retrait", name="post_retrait", methods="POST")
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param TransactionRepository $repository
     * @param ClientRepository $repoClient
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function makeRetrait(Request $request, EntityManagerInterface $manager, TransactionRepository $repository, ClientRepository $repoClient, SerializerInterface $serializer): JsonResponse
    {
        $requestTab = json_decode($request->getContent(),true);
        $transaction = $repository->findOneBy(["code_transaction"=>$requestTab["code_transaction"]]);
        //dd($requestTab);

        $userRetrait = $this->getUser();
        if (!$transaction){
            return new JsonResponse("this transaction does not exist",Response::HTTP_BAD_REQUEST);
        }

        if ($transaction->getStatut() == "cancel") {
            return new JsonResponse("this transaction is canceled",Response::HTTP_BAD_REQUEST);
        }

        if ($transaction->getStatut() == "done") {
            return new JsonResponse("this transaction is already retired",Response::HTTP_BAD_REQUEST);
        }

        //$clientRetrait = $repoClient->findOneBy(["telephone"=>$requestTab["receveur"]["telephone"]]);
        if ($requestTab["receveur"]["numero_cni"] != $transaction->getClientRetrait()->getNumeroCni()){
            return new JsonResponse('dou client bii wayy',Response::HTTP_BAD_REQUEST);
        }
        //dd($clientRetrait);
        if ($transaction->getUserDepot()) {
            $compteDepot = $transaction->getUserDepot()->getAgence()->getCompte();
        }elseif ($transaction->getDepotAdminAgence()){
            $compteDepot = $transaction->getDepotAdminAgence()->getAgence()->getCompte();
        }

        //$compteDepot = $transaction->getUserDepot()->getAgence()->getCompte();
        $compteRetrait = $userRetrait->getAgence()->getCompte();

        $compteDepot->setSolde($compteDepot->getSolde() + $transaction->getFraisDepot());
        $compteRetrait->setSolde($compteRetrait->getSolde() + $transaction->getFraisRetrait());

        //dd($transaction->getFraisDepot());
        //dd($compteDepot->getSolde());


        $transaction->setDateRetrait(new \DateTime());
        $transaction->setCompteRetrait($compteRetrait);
        $transaction->setStatut("done");
        if ($userRetrait instanceof UtilisateurAgence) {
            $transaction->setUserRetrait($userRetrait);
        }elseif ($userRetrait instanceof AdminAgence) {
            $transaction->setRetraitAdminAgence($userRetrait);
        }
        
        //dd($transaction);
        $manager->flush();

        $transactionDone = $serializer->serialize($transaction,"json",["groups"=>["transaction:retrait"]]);

        return new JsonResponse($transactionDone,Response::HTTP_CREATED,[],true);
    }

    /**
     * @Route ("/transactions/encours", name="get_transaction_attente", methods="GET")
     * @param TransactionRepository $repository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function transactionEnCour(TransactionRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        $transactions = $repository->findBy(["date_retrait"=>null]);
        $transactionsOn = $serializer->serialize($transactions,"json",["groups"=>["trans:on"]]);
        //dd($transactions);
        return new JsonResponse($transactionsOn,Response::HTTP_OK,[],true);
    }

    /**
     * @Route ("/transactions/complets", name="get_transaction_off", methods="GET")
     * @param TransactionRepository $repository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function transactionComplet(TransactionRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        $transactions = $repository->findAll();
        $transComplet=[];
        foreach ($transactions as $transaction){
            if ($transaction->getDateRetrait()){
                $transComplet[]= $transaction;
            }
        }
        //dd($transComplet);
        $transactionsOn = $serializer->serialize($transComplet,"json",["groups"=>["trans:on"]]);

        return new JsonResponse($transactionsOn,Response::HTTP_OK,[],true);
    }

    /**
     * @Route ("/transactions/bycode/{code}", name="get_transaction_by_code", methods="GET")
     * @param TransactionRepository $repository
     * @param SerializerInterface $serializer
     * @param Request $request
     * @return JsonResponse
     */
    public function transactionByCode(Request $request,string $code,TransactionRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        //$requestCode = json_decode($request->getContent(),true);
        $transaction = $repository->findOneBy(["code_transaction"=> $code]);
        $transactionsOn = $serializer->serialize($transaction,"json",["groups"=>["trans:code"]]);
        //dd($transactions);
        return new JsonResponse($transactionsOn,Response::HTTP_OK,[],true);
    }

    /**
     * @Route ("/transactions/agence", name="get_transaction_by_agence", methods="GET")
     * @param TransactionRepository $repository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function transactionAgence(TransactionRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        $compte = $user->getAgence()->getCompte();

        $transactions = $repository->findAll();
        $transComplet=[];
        // foreach ($transactions as $transaction){
        //     if ($transaction->getDateRetrait()){
        //         $transComplet[]= $transaction;
        //     }
        // }
        foreach ($compte->getTransactions() as $value) {
            $transComplet[]= $value;
        }
        foreach ($compte->getTransactionsRetrait() as $val) {
            $transComplet[]= $val;
        }
        //shuffle($transComplet);
        //dd($transComplet);
        $transactionsOn = $serializer->serialize($transComplet,"json");

        return new JsonResponse($transactionsOn,Response::HTTP_OK,[],true);
    }

    /**
     * @Route ("/transactions/part/tiers/periode", name="get_part_periode", methods="GET")
     * @param Request $request
     * @param TransactionRepository $repoTrans
     * @param SerializerInterface $serializer
     * @return JsonResponse
     * @throws Exception
     */
    public function getPartByPeriod(Request $request, TransactionRepository $repoTrans, SerializerInterface $serializer): JsonResponse
    {

        $tabDates = json_decode($request->getContent(),true);
        //dd(new \DateTime($tabDates["dateDebut"]));
        $transactions = $repoTrans->findAll();
        $transactionsByPeriod = [];
        foreach ($transactions as $transaction){
            if ($transaction->getDateRetrait()){
                if (( new \DateTime($tabDates['dateDebut']) <= $transaction->getDateRetrait()) && ( new \DateTime($tabDates['dateFin']) >= $transaction->getDateRetrait())) {
                    array_push($transactionsByPeriod,$transaction);
                }
            }
        }
        $transactionsPeriod = $serializer->serialize($transactionsByPeriod,"json",["groups"=>["part:tiers"]]);
        return new JsonResponse($transactionsPeriod, Response::HTTP_OK,[], true);
    }
}
