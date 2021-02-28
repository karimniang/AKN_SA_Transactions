<?php
namespace App\DataPersister;

use App\Entity\Agence;
use App\Entity\Caissier;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;


class CaissierDataPersister implements DataPersisterInterface
{

    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function supports($data): bool
    {
        // TODO: Implement supports() method.
        return $data instanceof Caissier;
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

        $this->entityManager->flush();
    }
}