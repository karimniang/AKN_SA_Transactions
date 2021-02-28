<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DepotRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiResource(
 *     collectionOperations={
 *      "add_depot"={
 *          "method"="POST",
 *          "path"="/depots",
 *          "route_name"="add_depot"
 *      },
 *      "GET"={
 *          "normalization_context"={"groups"={"depot:read"}}
 *      }
 *     },
 *     itemOperations={
 *      "GET"={
 *          "normalization_context"={"groups"={"depot:read"}}
 *      }
 *     }
 * )
 * @ORM\Entity(repositoryClass=DepotRepository::class)
 */
class Depot
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ({"depot:read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Compte::class, inversedBy="depots")
     * @Groups ({"read:depot:create","depot:read"})
     */
    private $compte;

    /**
     * @ORM\ManyToOne(targetEntity=Caissier::class, inversedBy="depots")
     * @Groups ({"read:depot:create","depot:read"})
     */
    private $caissier;

    /**
     * @ORM\Column(type="date")
     * @Groups ({"read:depot:create","depot:read"})
     */
    private $date_depot;

    /**
     * @ORM\Column(type="integer")
     * @Groups ({"read:depot:create","depot:read"})
     */
    private $montant;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCompte(): ?Compte
    {
        return $this->compte;
    }

    public function setCompte(?Compte $compte): self
    {
        $this->compte = $compte;

        return $this;
    }

    public function getCaissier(): ?Caissier
    {
        return $this->caissier;
    }

    public function setCaissier(?Caissier $caissier): self
    {
        $this->caissier = $caissier;

        return $this;
    }

    public function getDateDepot(): ?\DateTimeInterface
    {
        return $this->date_depot;
    }

    public function setDateDepot(\DateTimeInterface $date_depot): self
    {
        $this->date_depot = $date_depot;

        return $this;
    }

    public function getMontant(): ?int
    {
        return $this->montant;
    }

    public function setMontant(int $montant): self
    {
        $this->montant = $montant;

        return $this;
    }
}
