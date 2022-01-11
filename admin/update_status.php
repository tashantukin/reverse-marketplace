<?php
    require 'api.php';
  
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    

    $freelancer_details = [
        'status' => $content['status']

    ];
    error_log($freelancer_details);
    error_log($content['Id']);


    //get the freelancers email

   



   // $packageId, $tableName, $rowId, $data)
    $response = $API->editRowEntry($packageId, 'freelancer_details', $content['Id'], $freelancer_details);

    // edm here 

    echo json_encode($response);


    // $templates = array(array('Name' => 'Id', "Operator" => "equal",'Value' => $content['freelancerId']) );
    // $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_details';
    // $freelancerDetails =  callAPI("POST", $admin_token, $url, $templates);

    // $name = $freelancerDetails['Records'][0]['company_name'];

   

   

?>