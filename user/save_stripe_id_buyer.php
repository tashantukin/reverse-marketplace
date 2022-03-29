<?php
include 'callAPI.php';
include 'admin_token.php';

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$customerId = $content['customerId'];

$baseUrl = getMarketplaceBaseUrl();
$admin_token = getAdminToken();
$customFieldPrefix = getCustomFieldPrefix();
$userToken = $_COOKIE["webapitoken"];

$url = $baseUrl . '/api/v2/users/'; 
$result = callAPI("GET", $userToken, $url, false);
error_log($result);
$userId = $result['ID'];


$url = $baseUrl . '/api/v2/users/';
$result = callAPI("GET", $admin_token['access_token'], $url, false);
$admin_id = $result['ID'];

$now = new DateTime(); 

$url = $baseUrl . '/api/v2/admins/' . $admin_id . '/custom-field-definitions';
echo json_encode(['url' => $url]);
$packageCustomFields = callAPI("GET", $admin_token['access_token'], $url, false);

    foreach ($packageCustomFields['Records'] as $cf) {
        if ($cf['Name'] == 'stripe_payment_id') {
               $link_code = $cf['Code'];
        }
    }


        $data = [
            'CustomFields' => [
                [
                    'Code' => $link_code,
                    'Values' => [  $customerId ],
                ]

               
            ],
        ];
        echo json_encode(['date' => $data]);


    $url = $baseUrl . '/api/v2/users/' . $userId;
    echo json_encode(['url' => $url]);
    $result = callAPI("PUT", $admin_token['access_token'], $url, $data);
    echo json_encode(['result' => $result]);

//}


?>