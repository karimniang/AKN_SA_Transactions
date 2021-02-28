<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AdminSystemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     collectionOperations={
 *      "post_admin_system"={
 *          "method"="POST",
 *          "path"="/admin_system",
 *          "route_name"="add_admin_system"
 *      },
 *      "GET"
 *     },
 *     itemOperations={
 *      "GET",
 *      "PUT"
 *     }
 * )
 * @ORM\Entity(repositoryClass=AdminSystemRepository::class)
 */
class AdminSystem extends User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @groups({"userBuild:read"})
     */
    protected $id;

    public function getId(): ?int
    {
        return $this->id;
    }
}
