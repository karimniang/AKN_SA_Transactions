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
     * @Route("/users/connected", name="get_user", methods="GET")
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function getUserConnected(SerializerInterface $serializer): JsonResponse
    {
        //dd("o,");
        $user = $this->getUser();
        dd($user);
        $userConnected = $serializer->serialize($user,"json");
        return new JsonResponse($user,Response::HTTP_OK,[],true);
    }
}
