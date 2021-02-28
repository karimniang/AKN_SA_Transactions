<?php

namespace App\Controller;

use App\Services\AddUser;
use App\Services\AddUserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class AdminSystemController extends AbstractController
{
    /**
     * @Route("/admin_system", name="add_admin_system", methods ="POST")
     * @param Request $request
     * @param AddUserService $addUser
     * @return JsonResponse
     */
    public function addAdmin(Request $request, AddUserService $addUser): JsonResponse
    {
        //dd($request->request->all());
        //$user = $this->getUser();
        return $addUser->postUser("App\Entity\AdminSystem",$request,"ADMIN_SYSTEM");
    }
}
