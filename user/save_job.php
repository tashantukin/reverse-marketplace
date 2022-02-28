<?php
    require 'api.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $cf_details = [
         "custom_fields" => $content['custom_fields'],
         "location_list"=> $content['location_list'],
         "document_list" =>  $content['document_list']

        // 'remote_work' => $content['remote_work'],
        // 'inperson_work' => $content['inperson_work'],
        // 'inperson_work_address' => $content['inperson_work_address'],
        // 'job_type_full_time' => $content['job_type_full_time'],
        // 'job_type_contract' =>  $content['job_type_contract'],
        // 'job_availability' => $content['job_availability'],
        // 'payment_fixed' => $content['payment_fixed'],
        // 'payment_fixed_value' => $content['payment_fixed_value'],
        // 'payment_hourly' => $content['payment_hourly'],
        // 'payment_hourly_value' => $content['payment_hourly_value'],
        // 'task_type_BAS_Agent' => $content['task_type_BAS_Agent'],
        // 'task_type_Tax' => $content['task_type_Tax'],
        // 'task_type_Audit' => $content['task_type_Audit'], 
        // 'task_type_bookkeeping' => $content['task_type_bookkeeping'],
        // 'task_type_Payroll' => $content['task_type_Payroll'], 
        // 'task_type_Finance' => $content['task_type_Finance'], 
        // 'time_frame_urgent' => $content['time_frame_urgent'], 
        // 'time_frame_nohurry' => $content['time_frame_nohurry'],
        // 'time_frame_timestamp' => $content['time_frame_timestamp'],
        // 'comments' => $content['comments'],
        // 'acknowledged_legal' => $content['acknowledged_legal'],
        // 'buyer_email' => $content['buyer_email'],
        // 'buyer_name' => $content['buyer_name'],
        // 'buyer_contact_no' => $content['buyer_contact_no'], 
        // 'provide_personal_details_to_merchant' => $content['provide_personal_details_to_merchant'],
        // 'task_type_list' => $content['task_type_list'],
        // 'status' => 'Available',
        // 'no_of_quotes' => 0
    ];

    $response = $API->createRowEntry($packageId, 'job_list', $cf_details);

    echo json_encode($response);

    //save in job location ct 


   
   $location_details = [
         
         "job_title" => "",
         "location_list"=> $content['location_list'],
         "job_id" =>  $response['Id']

        
    ];

    
   $response = $API->createRowEntry($packageId, 'job_locations', $location_details);

?>