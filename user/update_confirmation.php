<?php
    require 'api.php';
    require 'callAPI.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();
    $admin_token = $API->AdminToken();
    $baseUrl = $API->getMarketplaceBaseUrl();

    
    $templates = array(array('Name' => 'user_id', "Operator" => "in",'Value' => $content['Id']));
    $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_details';
    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $userId = $templateDetails['Records'][0]['Id'];




    $freelancer_details = [
        'approved_confirmed' => 1

    ];


    // error_log($freelancer_details);
    // error_log($content['Id']);

   // $packageId, $tableName, $rowId, $data)
    $response = $API->editRowEntry($packageId, 'freelancer_details', $userId, $freelancer_details);

    echo json_encode($response);

?>