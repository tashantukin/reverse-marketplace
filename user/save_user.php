<?php
    require 'api.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $freelancer_details = [
        'user_id' => $content['user_id'],
        'custom_fields' => $content['custom_fields'],
        'servicing_area' => $content['servicing_area'],
        'status' => $content['status'],
        'attached_files' => $content['files'],

        'full_address' => $content['full_address'],
        'email'=> $content['email'], 
        'company_name' => $content['company_name'],  
        'country' => $content['country'] ,
        'state' => $content['state'],
        'city' => $content['city'],
        'postal_code' => $content['postal-code']
        
    ];

    $response = $API->createRowEntry($packageId, 'freelancer_details', $freelancer_details);

    echo json_encode($response);

?>