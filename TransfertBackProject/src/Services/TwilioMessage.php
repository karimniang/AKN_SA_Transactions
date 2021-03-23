<?php
namespace App\Services;

use Twilio\Rest\Client;

class TwilioMessage {

    private $client;
    public function __construct(Client $client)
    {
        $this->client = $client;
        
    }

    public function sendMessage($transaction){
        $this->client->messages->create(
            $transaction->getClientRetrait()->getTelephone(),
            [
                'from'=> "+12014845631",
                'body'=> "Bonjour ".$transaction->getClientRetrait()->getNomComplet()." ".$transaction->getClientDepot()->getNomComplet()." vous a envoyé ".$transaction->getMontant().". Le code de transaction est ".$transaction->getCodeTransaction(),
            ]
        );
    }
}