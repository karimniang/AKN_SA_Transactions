<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AdminAgenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiResource(
 *     collectionOperations={
 *      "POST",
 *      "GET",
 *      "get_user_connected"={
 *          "method"="GET",
 *          "path"="/users/connected",
 *          "route_name"="get_user"
 *      }
 *     },
 *     itemOperations={
 *      "GET",
 *      "PUT"
 *     }
 * )
 * @ORM\Entity(repositoryClass=AdminAgenceRepository::class)
 */
class AdminAgence extends User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups({"read:agence:create"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity=Agence::class, inversedBy="adminAgences")
     * @groups({"user:read"})
     */
    private $agence;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="depotAdminAgence")
     */
    private $depotTransactions;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="retraitAdminAgence")
     */
    private $retraitTransactions;

    public function __construct()
    {
        $this->depotTransactions = new ArrayCollection();
        $this->retraitTransactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAgence(): ?Agence
    {
        return $this->agence;
    }

    public function setAgence(?Agence $agence): self
    {
        $this->agence = $agence;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getDepotTransactions(): Collection
    {
        return $this->depotTransactions;
    }

    public function addDepotTransaction(Transaction $depotTransaction): self
    {
        if (!$this->depotTransactions->contains($depotTransaction)) {
            $this->depotTransactions[] = $depotTransaction;
            $depotTransaction->setDepotAdminAgence($this);
        }

        return $this;
    }

    public function removeDepotTransaction(Transaction $depotTransaction): self
    {
        if ($this->depotTransactions->removeElement($depotTransaction)) {
            // set the owning side to null (unless already changed)
            if ($depotTransaction->getDepotAdminAgence() === $this) {
                $depotTransaction->setDepotAdminAgence(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getRetraitTransactions(): Collection
    {
        return $this->retraitTransactions;
    }

    public function addRetraitTransaction(Transaction $retraitTransaction): self
    {
        if (!$this->retraitTransactions->contains($retraitTransaction)) {
            $this->retraitTransactions[] = $retraitTransaction;
            $retraitTransaction->setRetraitAdminAgence($this);
        }

        return $this;
    }

    public function removeRetraitTransaction(Transaction $retraitTransaction): self
    {
        if ($this->retraitTransactions->removeElement($retraitTransaction)) {
            // set the owning side to null (unless already changed)
            if ($retraitTransaction->getRetraitAdminAgence() === $this) {
                $retraitTransaction->setRetraitAdminAgence(null);
            }
        }

        return $this;
    }
}
