<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;



/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({"user" = "User", "adminAgence" = "AdminAgence", "adminSystem" = "AdminSystem", "utilisateurAgence" = "UtilisateurAgence", "caissier" = "Caissier"})
 * @ApiResource(
 *     collectionOperations={
 *      "POST",
 *      "GET",
 *      
 *     },
 *     itemOperations={
 *      "GET",
 *      "PUT",
 *      "get_user_connected"={
 *          "method"="GET",
 *          "path"="/user/connected",
 *          "route_name"="get_user"
 *      }
 *     }
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups({"user:read","userBuild:read","read:agence:create","agence:read","caissier:read","read:depot:create","depot:read","user:agence:read","trans:on"})
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @groups({"user:read","userBuild:read","read:agence:create","agence:read","caissier:read","user:agence:read"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @groups({"user:read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"user:read","admin_sys:write","userBuild:read","read:agence:create","agence:read","caissier:read","read:depot:create","depot:read","user:agence:read","trans:on"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"user:read","admin_sys:write","userBuild:read","read:agence:create","agence:read","caissier:read","read:depot:create","depot:read","user:agence:read","trans:on"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"user:read","admin_sys:write","userBuild:read","read:agence:create","agence:read","caissier:read","user:agence:read"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="boolean")
     * @groups({"userBuild:read","read:agence:create","agence:read","caissier:read","user:agence:read"})
     */
    private $statut = true;

    /**
     * @ORM\ManyToOne(targetEntity=Profil::class, inversedBy="users", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @groups({"userBuild:read","caissier:read"})
     */
    private $profil;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_'. strtoupper($this->profil->getLibelle());

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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

    public function getStatut(): ?bool
    {
        return $this->statut;
    }

    public function setStatut(bool $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getProfil(): ?Profil
    {
        return $this->profil;
    }

    public function setProfil(?Profil $profil): self
    {
        $this->profil = $profil;

        return $this;
    }
}
