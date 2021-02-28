<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CaissierRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attribute={
 *      "security" = "is_granted('ROLE_ADMIN_SYSTEM')"
 *     },
 *     collectionOperations={
 *      "post_caissier"={
 *          "method"="POST",
 *          "path"="/caissier",
 *          "route_name"="add_caissier"
 *      },
 *      "GET"={
 *          "normalization_context"={"groups"={"caissier:read"}}
 *     }
 *     },
 *     itemOperations={
 *      "GET",
 *      "PUT",
 *      "DELETE"
 *     }
 * )
 * @ORM\Entity(repositoryClass=CaissierRepository::class)
 */
class Caissier extends User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups ({"caissier:read"})
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity=Depot::class, mappedBy="caissier")
     */
    private $depots;

    public function __construct()
    {
        $this->depots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Depot[]
     */
    public function getDepots(): Collection
    {
        return $this->depots;
    }

    public function addDepot(Depot $depot): self
    {
        if (!$this->depots->contains($depot)) {
            $this->depots[] = $depot;
            $depot->setCaissier($this);
        }

        return $this;
    }

    public function removeDepot(Depot $depot): self
    {
        if ($this->depots->removeElement($depot)) {
            // set the owning side to null (unless already changed)
            if ($depot->getCaissier() === $this) {
                $depot->setCaissier(null);
            }
        }

        return $this;
    }
}
