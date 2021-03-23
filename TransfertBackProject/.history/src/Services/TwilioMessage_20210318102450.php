<?php
namespace App\Services;

use Twilio\Rest\Client;

class TwilioMessage {

    public function sendMessage($sender,$recever, $transaction, Client $client){
        $client->messages->create(
            $recever->getNumero(),
            [
                'from'=> "",
                'body'=> "Bonjour ".$recever->getNomComplet()." ".$sender->getNomComplet()." vous a envoyé ".$transaction->getMontant().". Le code de transaction est ".$transaction->getCodeTransaction(),
            ]
        );
    }
}