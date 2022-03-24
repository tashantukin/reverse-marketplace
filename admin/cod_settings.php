<?php
include 'callAPI.php';
include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$userId = $content['userId'];
$codStatus = $content['status'];
$codDescription = $content['description'];
error_log($rrpStatus);
$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();
// Query to get marketplace id
$url = $baseUrl . '/api/v2/marketplaces/';
$marketplaceInfo = callAPI("GET", null, $url, false);
$url = $baseUrl . '/api/developer-packages/custom-fields?packageId=' . getPackageID();
$packageCustomFields = callAPI("GET", null, $url, false);

$rrp_status = '';
foreach ($packageCustomFields as $cf) {
    if ($cf['Name'] == 'is_cod_enabled' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
           $cod_status = $cf['Code'];
    }
     if ($cf['Name'] == 'cod_description' && substr($cf['Code'], 0, strlen($customFieldPrefix)) == $customFieldPrefix) {
           $cod_description = $cf['Code'];
    }

}
$data = [

    'CustomFields' => [
        [
            'Code' => $cod_status,
            'Values' => [$codStatus],
        ],

         [
            'Code' => $cod_description,
            'Values' => [$codDescription],
        ],


    ],
];
$url = $baseUrl . '/api/v2/marketplaces/';
$result = callAPI("POST", $admin_token['access_token'], $url, $data);

?>