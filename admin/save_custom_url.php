<?php

include 'callAPI.php';
include 'admin_token.php';
$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();
$plugin_id =  getPackageID();
$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);
//3.get the value of long page url
$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';
$urlexp =   explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)); 
$host  = $urlexp[0];
error_log('host' . $host);
$host1 = $urlexp[1];
error_log('host1' . $host1);
$host2 = $urlexp[2];
error_log('host2' . $host2);
$host3 = $urlexp[3];
error_log('host3' . $host3);
$host4 = $urlexp[4];
error_log('host4' . $host4);
$host5 = $urlexp[5]; 
error_log('host5' . $host5);

$shortURL = '/subscribe';
$pathURL =  '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'freelancer_sign_up.php';
// POST THE DATA
$data = [
    'Key' => $shortURL,
    'Value' => $pathURL,

];
$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $data);

$styles = [
    'Key' => '/subscribe/css/styles.css',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'css' . '/' . 'styles.css',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $styles);



//js files

$script1 = [
    'Key' => '/subscribe/'. $plugin_id .'/scripts/users.js',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'scripts' . '/' . 'users.js',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script1);



$script2 = [
    'Key' => '/subscribe/'. $plugin_id .'/scripts/scripts.js',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'scripts' . '/' . 'scripts.js',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script2);



$script3 = [
    'Key' => '/subscribe/'. $plugin_id .'/scripts/lodge_job.js',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'scripts' . '/' . 'lodge_job.js',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script3);



$script4 = [
    'Key' => '/subscribe/'. $plugin_id .'/scripts/jquery.mapael.js',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'scripts' . '/' . 'jquery.mapael.js',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script4);



$script5 = [
    'Key' => '/subscribe/'. $plugin_id .'/scripts/usa_states.js',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/'. 'scripts' . '/' . 'usa_states.js',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script5);


$script6 = [
    'Key' => '/subscribe/'. $plugin_id .'/get_token.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/get_token.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script6);


$script7 = [
    'Key' => '/subscribe/'. $plugin_id .'/admin_token.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/admin_token.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script7);


$script8 = [
    'Key' => '/subscribe/'. $plugin_id .'/api.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/api.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script8);



$script9 = [
    'Key' => '/subscribe/'. $plugin_id .'/callAPI.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/callAPI.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script9);



$script10 = [
    'Key' => '/subscribe/'. $plugin_id .'/save_user.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/save_user.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script10);


$script11 = [
    'Key' => '/subscribe/'. $plugin_id .'/save_job.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/save_job.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script11);



$script12 = [
    'Key' => '/registration-done',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/registration-completed.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script12);




$script13 = [
    'Key' => '/subscribe/'. $plugin_id .'/update_confirmation.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/update_confirmation.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script13);



$script14 = [
    'Key' => '/subscribe/'. $plugin_id .'/stripe_auth.php',
    'Value' => '/' .  'user' .'/' . $host2 . '/' . $host3 . '/stripe_auth.php',

];

$url = $baseUrl . '/api/v2/rewrite-rules';
$result = callAPI("POST", $admin_token['access_token'], $url, $script14);

?>