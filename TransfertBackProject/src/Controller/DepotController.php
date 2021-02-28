<?php

namespace App\Controller;

use App\Entity\Depot;
use App\Repository\CompteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api")
 */
class DepotController extends AbstractController
{
    /**
     * @Route ("/depots", name="add_depot", methods="POST")
     * @param Request $request
     * @param CompteRepository $repoCompte
     * @param EntityManagerInterface $manager
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function addDepotCompte(Request $request, CompteRepository $repoCompte, EntityManagerInterface $manager,SerializerInterface $serializer): JsonResponse
    {
        //dd(json_decode($request->getContent(),true));
        $requestTab = json_decode($request->getContent(),true);
        $caissier = $this->getUser();
        $compte = $repoCompte->findOneBy(["numero_compte"=>$requestTab["numero_compte"]]);
        if (!$compte){
            return new JsonResponse("This account does not exist",Response::HTTP_BAD_REQUEST);
        }
        $compte->setSolde($compte->getSolde()+$requestTab["montant"]);

        $depot = new Depot();
        $depot->setCaissier($caissier);
        $depot->setCompte($compte);
        $depot->setDateDepot(new \DateTime());
        $depot->setMontant($requestTab['montant']);

        //dd($depot);
        $manager->persist($depot);
        $manager->flush();

        $depotBuild = $serializer->serialize($depot,"json",["groups"=>["read:depot:create"]]);
        return new JsonResponse($depotBuild,Response::HTTP_CREATED,[],"json");

    }

}
