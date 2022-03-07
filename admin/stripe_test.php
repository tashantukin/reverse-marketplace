<?php
require_once('stripe-php/init.php');

//$stripe = new \Stripe\StripeClient('sk_test_BQokikJOvBiI2HlWgH4olfQ2');


$stripe = new \Stripe\StripeClient(

'sk_test_51INpZ6LpiOi48zknrweuYlbv7lThIzaBNcn4dgyXSXZHNeAolscJsVo9YdHYmbH4EPW1ty4ByRicFi5KvAPMjC5V00CatSNcjd'
);
$customer =  $stripe->accounts->create(['type' => 'express']);
// $stripe->accounts->create(['type' => 'express']);
// $customer = $stripe->customers->create([
//     'description' => 'example customer',
//     'email' => 'email@example.com',
//     'payment_method' => 'pm_card_visa',
// ]);
echo $customer;

?>