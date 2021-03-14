<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/api/users/connected", name="get_user", methods="GET")
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function getUserConnected(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        $userConnected = $serializer->serialize($user,"json",["groups"=>["user:read"]]);
        return new JsonResponse($userConnected,Response::HTTP_OK,[],true);
    }
}
