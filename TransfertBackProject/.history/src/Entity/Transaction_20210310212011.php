<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;



/**
 * @ORM\Entity(repositoryClass=TransactionRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *      "add_depot"={
 *          "method"="POST",
 *          "path"="/transactions/depot",
 *          "route_name"="post_depot"
 *      },
 *      "add_retrait"={
 *          "method"="POST",
 *          "path"="/transactions/retrait",
 *          "route_name"="post_retrait"
 *      },
 *      "get_transactions_agence"={
 *          "method"="GET",
 *          "path"="/transactions/agence",
 *          "route_name"="get_transaction_by_agence"
 *      },
 *      "get_transactions_cours"={
 *          "method"="GET",
 *          "path"="/transactions/encours",
 *          "route_name"="get_transaction_attente"
 *      },
 *      "get_transactions_complet"={
 *          "method"="GET",
 *          "path"="/transactions/complets",
 *          "route_name"="get_transaction_off"
 *      },
 *      "get_part_tiers"= {
 *          "method"="GET",
 *          "path"="/transactions/part/tiers",
 *          "normalization_context"={"groups"={"part:tiers"}}
 *      },
 *      "get_part_tiers_periode"= {
 *          "method"="GET",
 *          "path"="/transactions/part/tiers/periode",
 *          "route_name"="get_part_periode",
 *          "normalization_context"={"groups"={"part:tiers"}}
 *      },
 *      "GET"={
 *          "normalization_context"={"groups"={"trans:on"}}
 *      }
 *     },
 *     itemOperations={
 *      "GET"={
 *          "normalization_context"={"groups"={"trans:on"}}
 *      },
 *      "PUT"
 *     }
 * )
 */
class Transaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"trans:on","part:tiers"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"transaction:done","transaction:retrait","trans:on","part:tiers"})
     */
    private $montant;

    /**
     * @ORM\Column(type="date")
     * @Groups({"transaction:done","transaction:retrait","trans:on"})
     */
    private $date_depot;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups({"transaction:retrait","trans:on"})
     */
    private $date_retrait;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"transaction:done","transaction:retrait","trans:on"})
     */
    private $code_transaction;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"transaction:done","transaction:retrait","trans:on"})
     */
    private $frais;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"part:tiers"})
     */
    private $frais_depot;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"part:tiers"})
     */
    private $frais_retrait;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"part:tiers"})
     */
    private $frais_etat;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $frais_systeme;

    /**
     * @ORM\ManyToOne(targetEntity=Compte::class, inversedBy="transactions")
     * @groups({"trans:on"})
     */
    private $compteTransaction;

    /**
     * @ORM\ManyToOne(targetEntity=UtilisateurAgence::class, inversedBy="transactions")
     * @Groups({"trans:on"})
     */
    private $userDepot;

    /**
     * @ORM\ManyToOne(targetEntity=UtilisateurAgence::class, inversedBy="transactions")
     * @Groups({"trans:on"})
     */
    private $userRetrait;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="transactions",cascade={"persist"})
     * @Groups({"transaction:done"})
     */
    private $clientDepot;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="transactions",cascade={"persist"})
     */
    private $clientRetrait;

    /**
     * @ORM\ManyToOne(targetEntity=Compte::class, inversedBy="transactionsRetrait")
     * @groups({"trans:on"})
     */
    private $compteRetrait;

    /**
     * @ORM\ManyToOne(targetEntity=AdminAgence::class, inversedBy="depotTransactions")
     * @Groups({"trans:on"})
     */
    private $depotAdminAgence;

    /**
     * @ORM\ManyToOne(targetEntity=AdminAgence::class, inversedBy="retraitTransactions")
     * @Groups({"trans:on"})
     */
    private $retraitAdminAgence;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __construct(){
        $this->date_depot = new \DateTime();
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

    public function getDateDepot(): ?\DateTimeInterface
    {
        return $this->date_depot;
    }

    public function setDateDepot(\DateTimeInterface $date_depot): self
    {
        $this->date_depot = $date_depot;

        return $this;
    }

    public function getDateRetrait(): ?\DateTimeInterface
    {
        return $this->date_retrait;
    }

    public function setDateRetrait(?\DateTimeInterface $date_retrait): self
    {
        $this->date_retrait = $date_retrait;

        return $this;
    }

    public function getCodeTransaction(): ?string
    {
        return $this->code_transaction;
    }

    public function setCodeTransaction(?string $code_transaction): self
    {
        $this->code_transaction = $code_transaction;

        return $this;
    }

    public function getFrais(): ?int
    {
        return $this->frais;
    }

    public function setFrais(?int $frais): self
    {
        $this->frais = $frais;

        return $this;
    }

    public function getFraisDepot(): ?int
    {
        return $this->frais_depot;
    }

    public function setFraisDepot(?int $frais_depot): self
    {
        $this->frais_depot = $frais_depot;

        return $this;
    }

    public function getFraisRetrait(): ?int
    {
        return $this->frais_retrait;
    }

    public function setFraisRetrait(?int $frais_retrait): self
    {
        $this->frais_retrait = $frais_retrait;

        return $this;
    }

    public function getFraisEtat(): ?int
    {
        return $this->frais_etat;
    }

    public function setFraisEtat(?int $frais_etat): self
    {
        $this->frais_etat = $frais_etat;

        return $this;
    }

    public function getFraisSysteme(): ?int
    {
        return $this->frais_systeme;
    }

    public function setFraisSysteme(?int $frais_systeme): self
    {
        $this->frais_systeme = $frais_systeme;

        return $this;
    }

    public function getCompteTransaction(): ?Compte
    {
        return $this->compteTransaction;
    }

    public function setCompteTransaction(?Compte $compteTransaction): self
    {
        $this->compteTransaction = $compteTransaction;

        return $this;
    }

    public function getUserDepot(): ?UtilisateurAgence
    {
        return $this->userDepot;
    }

    public function setUserDepot(?UtilisateurAgence $userDepot): self
    {
        $this->userDepot = $userDepot;

        return $this;
    }

    public function getUserRetrait(): ?UtilisateurAgence
    {
        return $this->userRetrait;
    }

    public function setUserRetrait(?UtilisateurAgence $userRetrait): self
    {
        $this->userRetrait = $userRetrait;

        return $this;
    }

    public function getClientDepot(): ?Client
    {
        return $this->clientDepot;
    }

    public function setClientDepot(?Client $clientDepot): self
    {
        $this->clientDepot = $clientDepot;

        return $this;
    }

    public function getClientRetrait(): ?Client
    {
        return $this->clientRetrait;
    }

    public function setClientRetrait(?Client $clientRetrait): self
    {
        $this->clientRetrait = $clientRetrait;

        return $this;
    }

    public function getCompteRetrait(): ?Compte
    {
        return $this->compteRetrait;
    }

    public function setCompteRetrait(?Compte $compteRetrait): self
    {
        $this->compteRetrait = $compteRetrait;

        return $this;
    }

    public function getDepotAdminAgence(): ?AdminAgence
    {
        return $this->depotAdminAgence;
    }

    public function setDepotAdminAgence(?AdminAgence $depotAdminAgence): self
    {
        $this->depotAdminAgence = $depotAdminAgence;

        return $this;
    }

    public function getRetraitAdminAgence(): ?AdminAgence
    {
        return $this->retraitAdminAgence;
    }

    public function setRetraitAdminAgence(?AdminAgence $retraitAdminAgence): self
    {
        $this->retraitAdminAgence = $retraitAdminAgence;

        return $this;
    }
}
