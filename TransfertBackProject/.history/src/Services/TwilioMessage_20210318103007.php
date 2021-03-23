<?php
namespace App\Services;

use Twilio\Rest\Client;

class TwilioMessage {

    public function sendMessage($transaction, Client $client){
        $client->messages->create(
            $transaction->getClientRetrait->getNumero(),
            [
                'from'=> "",
                'body'=> "Bonjour ".$transaction->getClientRetrait->getNomComplet()." ".$transaction->getClientDepot->getNomComplet()." vous a envoyé ".$transaction->getMontant().". Le code de transaction est ".$transaction->getCodeTransaction(),
            ]
        );
    }
}