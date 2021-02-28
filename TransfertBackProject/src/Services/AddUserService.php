<?php
namespace App\Services;

use App\Entity\Client;
use App\Entity\User;
use App\Repository\ProfilRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

class AddUserService {
    private $encoder;
    private $repoProfils;
    private $manager;
    private $serializer;
    private $repoUser;

    public function __construct(UserRepository $repoUser,ProfilRepository $repoProfils, EntityManagerInterface $manager, SerializerInterface $serializer, UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
        $this->repoProfils = $repoProfils;
        $this->manager = $manager;
        $this->serializer = $serializer;
        $this->repoUser = $repoUser;
    }

    public function postUser($entity, $request, $profileAdded):JsonResponse
    {

        $userTab = $request->request->all();
        //return new JsonResponse($userTab['lastname']);
        //dd($userTab);
        $user = $this->buildUserAgency($userTab,$entity,$profileAdded);



        //dd($user);
        $this->manager->persist($user);
        $this->manager->flush();

        //$userCreate = $this->serializer->serialize($user, 'json', ["groups" => ["userBuild:read"]]);

        return new JsonResponse("success", \Symfony\Component\HttpFoundation\Response::HTTP_CREATED, [], true);
    }

    public function buildUserAgency($object,$entity,$profileAdded)
    {
        $bigString = 'abcdefghilkmnopqrstuvwxyz';
        $longueurMax = strlen($bigString);
        $randomString = '';
        for ($i = 0; $i < 3; $i++) {
            $randomString .= $bigString[rand(0, $longueurMax - 1)];
        }
        $username = strtolower($randomString."123".substr($object['firstname'],1,3));
        //dd($username);
        if($this->repoUser->findBy(["username"=>$username])){
            return new JsonResponse("This username already exist", Response::HTTP_BAD_REQUEST, [], true);
        }


        $profile = $this->repoProfils->findBy(["libelle"=> $profileAdded]);
        //dd($profile);
        $user = $this->serializer->denormalize($object, $entity, true,["groups" => "admin_sys:write"]);
        $user->setProfil($profile[0]);
        $user->setPassword($this->encoder->encodePassword($user, $object["password"]));
        $user->setUsername($username);
        return $user;
    }


    public function buildClient($object): Client
    {
        $client = new Client();
        $client->setNomComplet($object['nom_complet']);
        $client->setNumeroCni($object['numero_cni']);
        $client->setTelephone($object['telephone']);

        return $client;
    }
}