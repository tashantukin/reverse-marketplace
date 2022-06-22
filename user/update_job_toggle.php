<?php

require 'api.php';
require 'callAPI.php';
$API = new API();

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$packageId = $API->getPackageID();


$baseUrl = $API->getMarketplaceBaseUrl();
$admin_token = $API->AdminToken();

$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token, $url, false);
$admin_id = $result['ID'];

$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);

$protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === 0 ? 'https://' : 'http://';
$mplink =  $protocol .= $marketplaceInfo['DefaultDomain'];
$mplogo1 = $marketplaceInfo['LogoUrl'];
$mpname =   $marketplaceInfo['Name'];
$mpEmail =  $marketplaceInfo['Owner']['Email'];
$admin_name = $marketplaceInfo['Owner']['FirstName'];

$tempoId = $packageId;

$job_details = [

'status' => $content['status']

];

$response = $API->editRowEntry($packageId, 'job_list', $content['jobId'], $job_details);


?>