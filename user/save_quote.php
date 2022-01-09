<?php
    require 'api.php';
    require 'callAPI.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $quote_details = [
               "job_id" => $content['job_id'],
               "freelancer_id" => $content['freelancer_id'],
               "job_summary" => $content['job_summary'],
               "total" => $content['total'],
               "all_discount" => $content['all_discount'],
               "all_total" => $content['all_total'],

               
               "job_completion" => $content['job_completion'],
               "availability_date" => $content['availability_date'],
               "validity_date" => $content['validity_date'],
               
               
               "deposit_required" => $content['deposit_required'],
               "for_7_days" => $content['for_7_days'],
               "for_30_days" => $content['for_30_days'] , 
               "deposit_amount" => $content['deposit_amount'],
               "comments_on_terms" => $content['comments_on_terms'],


               "payment_cod" => $content['payment_cod'],
               "payment_credit_card" => $content['payment_credit_card'],
               "payment_paypal" => $content['payment_paypal'],
    ];

    $response = $API->createRowEntry($packageId, 'job_quotes', $quote_details);

    echo json_encode($response);

        $baseUrl = $API->getMarketplaceBaseUrl();
        $admin_token = $API->AdminToken();
        
     
        //$url = $baseUrl . '/api/v2/plugins/'.$packageId.'/custom-tables/Templates/'.$pageID; 
    
        $templates = array(array('Name' => 'Id', "Operator" => "in",'Value' => $content['job_id']));
        $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/job_cache';
        $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

        $number_of_quotes = $templateDetails['Records'][0]['no_of_quotes'];


        $job_details = [
            'status' => 'Quoted',
            'no_of_quotes' => $number_of_quotes + 1
    
        ];
        
        //update the no of quotes and status of the job lodged
    
       // $packageId, $tableName, $rowId, $data)
        $response = $API->editRowEntry($packageId, 'job_cache', $content['job_id'], $job_details);



       





        
        
    

?>