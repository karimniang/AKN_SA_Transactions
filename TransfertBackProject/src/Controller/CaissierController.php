<?php

namespace App\Controller;

use App\Services\AddUserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class CaissierController extends AbstractController
{
    /**
     * @Route("/caissier", name="add_caissier", methods ="POST")
     * @param Request $request
     * @param AddUserService $addUserService
     * @return JsonResponse
     */
    public function addCaissier(Request $request, AddUserService $addUserService):JsonResponse
    {
        return $addUserService->postUser("App\Entity\Caissier",$request,"CAISSIER");
    }
}
