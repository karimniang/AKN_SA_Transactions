<?php
namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface {
    public function checkPreAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
           return; 
        }

        if ($user->getStatut() == false) {
            throw new CustomUserMessageAccountStatusException("Votre compte a été bloqué !!!");
        }
    }

    public function checkPostAuth(UserInterface $user)
    {
        if (!$user instanceof User) {
            return; 
         }
    
    }
}
