<?php

namespace App\Controller;

use App\Entity\Agence;
use App\Repository\AgenceRepository;
use App\Repository\UtilisateurAgenceRepository;
use App\Services\AddUserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api")
 */
class AgenceController extends AbstractController
{
    /**
     * @Route ("/agences", name="add_agence", methods="POST")
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param AddUserService $addUserService
     * @param EntityManagerInterface $manager
     * @param AgenceRepository $repoAgence
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function addAgence(Request $request, SerializerInterface $serializer,AddUserService $addUserService, EntityManagerInterface $manager,AgenceRepository $repoAgence): JsonResponse
    {
        //dd(json_decode($request->getContent(),true));
        $agencyTab = json_decode($request->getContent(),true);
        if ($agencyTab["compte"]['solde'] < 700000) {
            return new JsonResponse("Le solde d'un compte est initialisé avec au moins 700000.",Response::HTTP_BAD_REQUEST);
        }
        if ($repoAgence->findBy(["nom"=>$agencyTab["nom"]])) {
            //dd("ok");
            return new JsonResponse("This name already exist.",Response::HTTP_BAD_REQUEST);
        }
        $agency = $serializer->denormalize($agencyTab, Agence::class, true,["groups" => "agence:write"]);
        $agency->getCompte()->setNumeroCompte($agencyTab["compte"]["numero_compte"]);
        $agency->getCompte()->setDateCreation(new \DateTime());

        foreach ($agencyTab["adminAgence"] as $adminAgence){
            $user = $addUserService->buildUserAgency($adminAgence,"App\Entity\AdminAgence","ADMIN_AGENCE");
            $agency->addAdminAgence($user);
            //dd($user);
        }
        foreach ($agencyTab["usersAgence"] as $userAgence){
            $user = $addUserService->buildUserAgency($userAgence,"App\Entity\UtilisateurAgence","UTILISATEUR_AGENCE");
            $agency->addUserAgence($user);
            //dd($user);
        }

        //dd($agency);
        $manager->persist($agency);
        $manager->flush();

        $agencyDB = $repoAgence->findBy(["longitude"=>$agency->getLongitude(),"latitude"=>$agency->getLatitude()])[0];
        $agencyCreate = $serializer->serialize($agencyDB, 'json',["groups"=>["read:agence:create"]]);
        //dd($agencyCreate);

        return new JsonResponse($agencyCreate, \Symfony\Component\HttpFoundation\Response::HTTP_CREATED, [], true);
        //dd($agency);

    }

    /**
     * @Route ("/agences/{id}/users", name="get_users_agences", methods="GET")
     * @param int $id
     * @param AgenceRepository $repoAgence
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function getUsersByAgence(int $id, AgenceRepository $repoAgence, SerializerInterface $serializer): JsonResponse
    {
        $agence = $repoAgence->find($id);
        $inAgence = false;
        if (!$agence){
            return new JsonResponse("This agence does not exist",Response::HTTP_BAD_REQUEST);
        }
        $adminAgenceConnected = $this->getUser();
        //dd($adminAgenceConnected);
        //dd(in_array($adminAgence,$agence->getAdminAgences()));
        foreach ($agence->getAdminAgences() as $adminAgence){
            if ($adminAgenceConnected == $adminAgence){
                //dd('un');
                $inAgence = true;
            }
        }
        if ($inAgence == false){
            return new JsonResponse("You can not show this list",Response::HTTP_BAD_REQUEST);
        }

        $agenceReturn = $serializer->serialize($agence,"json",["groups"=>["user:agence:read"]]);
        //dd($agence);
        return new JsonResponse($agenceReturn,Response::HTTP_OK,[],true);
    }

    /**
     * @Route ("/agences/{id_agence}/users/{id_user}", name="bloc_user", methods="PUT")
     * @param int $id_agence
     * @param int $id_user
     * @param SerializerInterface $serializer
     * @param AgenceRepository $repoAgence
     * @param UtilisateurAgenceRepository $usersRepository
     * @param EntityManagerInterface $manager
     * @return JsonResponse
     */
    public function blocUserByAgence(int $id_agence, int $id_user, SerializerInterface $serializer, AgenceRepository $repoAgence, UtilisateurAgenceRepository $usersRepository, EntityManagerInterface $manager): JsonResponse
    {
        $agency = $repoAgence->find($id_agence);
        $inAgence = false;
        if (!$agency){
            return new JsonResponse("This agence does not exist",Response::HTTP_BAD_REQUEST);
        }
        $adminAgenceConnected = $this->getUser();

        foreach ($agency->getAdminAgences() as $adminAgence){
            if ($adminAgenceConnected == $adminAgence){
                //dd('un');
                $inAgence = true;
            }
        }
        if ($inAgence == false){
            return new JsonResponse("You can not bloc this user",Response::HTTP_BAD_REQUEST);
        }
        $userAgence = $usersRepository->findOneBy(["id"=>$id_user,"agence"=>$id_agence]);
        if (!$userAgence){
            return new JsonResponse("This user Agence does not exist",Response::HTTP_BAD_REQUEST);
        }
        $userAgence->setStatut(false);
        $manager->flush();

        $newUser = $serializer->serialize($userAgence,"json");
        return new JsonResponse($newUser,Response::HTTP_OK,[],true);
        //dd($userAgence);
    }

    /**
     * @Route ("/agences/parts", name="get_part_agence", methods="GET")
     */
    public function getPartAgence()
    {

    }
}
