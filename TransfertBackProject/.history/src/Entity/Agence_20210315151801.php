<?php

namespace App\Entity;

use App\Repository\AgenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;



/**
 * @ORM\Entity(repositoryClass=AgenceRepository::class)
 * @ApiResource(
 *     attribute={
 *      "security" = "is_granted('ROLE_ADMIN_SYSTEM')"
 *     },
 *     collectionOperations={
 *      "add_agence"={
 *          "method"="POST",
 *          "path"="/agences",
 *          "denormalization_context"={"groups"={"agence:write"}}
 *      },
 *      "GET"={
 *          "normalization_context"={"groups"={"agence:read"}}
 *      },
 *      "get_part"={
 *          "method"="GET",
 *          "path"="/agences/parts",
 *          "route_name"="get_part_agence"
 *      }
 *     },
 *     itemOperations={
 *      "GET"={
 *          "normalization_context"={"groups"={"agence:read"}}
 *      },
 *      "get_user_agence"={
 *          "method"="GET",
 *          "path"="/agences/{id}/users",
 *          "route_name"="get_users_agences"
 *      },
 *      "bloc_user_agence"={
 *          "method"="PUT",
 *          "path"="/agences/{id_agence}/users/{id_user}",
 *          "route_name"="bloc_user"
 *      },
 *      "PUT",
 *      "DELETE"
 *     }
 * )
 * @UniqueEntity(
 *  fields={"nom"},
 *  message="Ce nom existe déjà"
 * )
 */
class Agence
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups ({"trans:on","agence:read","user:agence:read","user:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups ({"trans:on","agence:write","read:agence:create","agence:read"})
     */
    private $adresse;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups ({"agence:write","read:agence:create","agence:read"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="float")
     * @groups ({"agence:write","read:agence:create","agence:read"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="float")
     * @groups ({"agence:write","read:agence:create","agence:read"})
     */
    private $latitude;

    /**
     * @ORM\OneToMany(targetEntity=AdminAgence::class, mappedBy="agence", cascade={"persist"})
     * @groups ({"read:agence:create","agence:read"})
     */
    private $adminAgences;

    /**
     * @ORM\OneToMany(targetEntity=UtilisateurAgence::class, mappedBy="agence", cascade={"persist"})
     * @groups ({"read:agence:create","agence:read","user:agence:read"})
     */
    private $userAgences;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, inversedBy="agence", cascade={"persist", "remove"})
     * @groups ({"agence:write","agence:read","read:agence:create"})
     */
    private $compte;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups ({"trans:on","agence:write"})
     */
    private $nom;

    /**
     * @ORM\Column(type="boolean")
     */
    private $statut = true;


    public function __construct()
    {
        $this->adminAgences = new ArrayCollection();
        $this->userAgences = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @return Collection|AdminAgence[]
     */
    public function getAdminAgences(): Collection
    {
        return $this->adminAgences;
    }

    public function addAdminAgence(AdminAgence $adminAgence): self
    {
        if (!$this->adminAgences->contains($adminAgence)) {
            $this->adminAgences[] = $adminAgence;
            $adminAgence->setAgence($this);
        }

        return $this;
    }

    public function removeAdminAgence(AdminAgence $adminAgence): self
    {
        if ($this->adminAgences->removeElement($adminAgence)) {
            // set the owning side to null (unless already changed)
            if ($adminAgence->getAgence() === $this) {
                $adminAgence->setAgence(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UtilisateurAgence[]
     */
    public function getUserAgences(): Collection
    {
        return $this->userAgences;
    }

    public function addUserAgence(UtilisateurAgence $userAgence): self
    {
        if (!$this->userAgences->contains($userAgence)) {
            $this->userAgences[] = $userAgence;
            $userAgence->setAgence($this);
        }

        return $this;
    }

    public function removeUserAgence(UtilisateurAgence $userAgence): self
    {
        if ($this->userAgences->removeElement($userAgence)) {
            // set the owning side to null (unless already changed)
            if ($userAgence->getAgence() === $this) {
                $userAgence->setAgence(null);
            }
        }

        return $this;
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

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getStatut(): ?bool
    {
        return $this->statut;
    }

    public function setStatut(bool $statut): self
    {
        $this->statut = $statut;

        return $this;
    }


}
