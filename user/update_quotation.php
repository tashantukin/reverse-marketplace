<?php
    require 'api.php';
    require 'callAPI.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();


    $baseUrl = $API->getMarketplaceBaseUrl();
    $admin_token = $API->AdminToken();
        
     
      
     //update the freelancer_quotes table

     $templates = array(array('Name' => 'job_id', "Operator" => "equal",'Value' => $content['jobId']), array('Name' => 'freelancer_id', "Operator" => "equal",'Value' => $content['freelancerId']) );
     $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_quotes';
     $quoteDetails =  callAPI("POST", $admin_token, $url, $templates);

     $quote_id = $quoteDetails['Records'][0]['Id'];

     $quote_details = [
            
        'status' => $content['status']

    ];
    
    $response = $API->editRowEntry($packageId, 'freelancer_quotes', $quote_id, $quote_details);

   //update quote table


   $quote_details = [
          
      'status' => $content['status']

  ];
  
  $response = $API->editRowEntry($packageId, 'job_quotes', $content['quoteId'], $quote_details);




?>