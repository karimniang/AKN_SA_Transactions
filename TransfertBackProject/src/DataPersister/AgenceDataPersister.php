<?php
namespace App\DataPersister;

use App\Entity\Agence;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;


class AgenceDataPersister implements DataPersisterInterface
{

    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function supports($data): bool
    {
        // TODO: Implement supports() method.
        return $data instanceof Agence;
    }

    public function persist($data)
    {
        $this->entityManager->persist($data);
        $this->entityManager->flush();
        // TODO: Implement persist() method.
    }

    public function remove($data)
    {
        // TODO: Implement remove() method.
        $data->setStatut(false);
        $data->getCompte()->setStatut(false);
         if (!empty($data->getAdminAgences())) {
             foreach ($data->getAdminAgences() as $adminAgence) {
                 $adminAgence->setStatut(false);
             }
         }
        if (!empty($data->getUserAgences())) {
            foreach ($data->getUserAgences() as $userAgence) {
                $userAgence->setStatut(false);
            }
        }

        $this->entityManager->flush();
    }
}