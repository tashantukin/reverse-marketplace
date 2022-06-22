<?php
    require 'api.php';
    require 'callAPI.php';
    $API = new API();

    $contentBodyJson = file_get_contents('php://input');
    $content = json_decode($contentBodyJson, true);
    $packageId = $API->getPackageID();

    $cf_details = [
         "custom_fields" => $content['custom_fields'],
         "location_list"=> $content['location_list'],
         "document_list" =>  $content['document_list'],

         //job locations
        'is_remote_work' => $content['is_remote_work'],
        'is_in_person_work' => $content['is_inperson_work'],
        'in_person_work_address' => $content['in_person_work_address'],
        'in_person_work_coords' => $content['in_person_work_coords'], 


        //job type
        'is_job_type_fulltime' => $content['is_job_type_fulltime'],
        'is_job_type_contract' =>  $content['is_job_type_contract'],
        
        //payment
        'is_payment_fixed' => $content['is_payment_fixed'],
        'is_payment_hourly' => $content['is_payment_hourly'],
        'payment_amount' => $content['payment_amount'],

        //task type list
        'task_type_list' => $content['task_type_list'],

        //time frame
        'time_frame_urgent' => $content['time_frame_urgent'], 
        'time_frame_nohurry' => $content['time_frame_nohurry'],
        'time_frame_date' => $content['time_frame_date'],
        'completion_date' => $content['completion_date'],   
        'job_validity' => $content['job_validity'],
        'comments' => $content['comments'],

        //contact info

        'buyer_name' => $content['buyer_name'],
        'buyer_email' => $content['buyer_email'],
        'buyer_contact' => $content['buyer_contact'],
        'will_provide_info' => "True",
        'status' => 'Available',
        'no_of_quotes' => 0
        
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
        
        // 'status' => 'Available',
        // 'no_of_quotes' => 0
    ];
    
    $response = $API->createRowEntry($packageId, 'job_list', $cf_details);
     
             
    error_log('jobs ' . json_encode($response));
    echo json_encode($response);

    //save in job location ct 

   $location_details = [
         
         "job_title" => "",
         "location_list"=> $content['location_list'],
         "job_id" =>  $response['Id']

        
    ];

    
   $response = $API->createRowEntry($packageId, 'job_locations', $location_details);


   //send edms for registered freelancers
   // search all freelancers with approved status
     $baseUrl = $API->getMarketplaceBaseUrl();
    $admin_token = $API->AdminToken();

    $templates = array(array('Name' => 'status', "Operator" => "equal",'Value' => 'Approved'));
    $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_details?pageSize=1000';
    $merchantDetails =  callAPI("POST", $admin_token, $url, $templates);

   // error_log(json_encode($quoteDetails));

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
    $lat = $content['in_person_work_coords'][0];
    $long = $content['in_person_work_coords'][1];



    $tempoId = $packageId;
    $templates = array(array('Name' => 'title', "Operator" => "in",'Value' => 'New Job Lodged'));
    $url =  $baseUrl . '/api/v2/plugins/'. $tempoId .'/custom-tables/Templates';
  

    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $content = $templateDetails['Records'][0]['contents'];

     foreach( $merchantDetails['Records'] as $merchant) {

         $merchant_email =  $merchant['email'];
        
            
        if ( $content['is_inperson_work'] == true ) {
             $coordinates =  json_decode($merchant['servicing_area_coords'], TRUE);
                error_log('coord 0' . $coordinates[0]);
                error_log('coords ' . json_encode($coordinates));
             try {
                if ($coordinates) {
                    $distance = distance($coordinates[0], $coordinates[1], (int)$lat, (int)$long, "K");
                    error_log('dist ' . $distance);
                    if ($distance < 100) {
                    error_log('within 100 km');

                    $token = array(
                    'Logo'  => $mplogo1,
                    'MarketplaceUrl' => $mplink,
                    'MarketName' => $mpname,
                    'AdminName' => $admin_name,
                    'CompanyName' => $merchant['company_name'],);

                        $pattern = '{{ %s }}';
                    
                        foreach ($token as $key => $val) {
                            $varMap[sprintf($pattern, $key)] = $val;
                        }

                        $emailContent = strtr($content, $varMap);


                        //send EDM
                        $subject = $templateDetails['Records'][0]['subject'];
                        $data = [
                            'From' => $mpEmail,
                            'To' => $merchant_email,
                            'CC' =>  '',
                            'BCC' =>  '', 
                            'Subject' => $subject,
                            'Body' =>  $emailContent 

                        ];

                        $url =  $baseUrl . '/api/v2/admins/' . $admin_id .'/emails';
                        $sendEDM = callAPI("POST", $admin_token, $url, $data);
                        error_log('within ' . $sendEDM);

                                        
                                    
                        } else {
                            error_log('ouitside 100 km');
                            // echo "Outside 100 kilometer radius";
                                }
                }
                            
            }catch (Exception $ex) {
                    error_log($ex);
            }    
        }else {

            //send to everyone if the work is remote
              $token = array(
                'Logo'  => $mplogo1,
                'MarketplaceUrl' => $mplink,
                'MarketName' => $mpname,
                'AdminName' => $admin_name,
                'CompanyName' => $merchant['company_name'],);

                    $pattern = '{{ %s }}';
                
                    foreach ($token as $key => $val) {
                        $varMap[sprintf($pattern, $key)] = $val;
                    }

                    $emailContent = strtr($content, $varMap);


                    //send EDMS
                    $subject = $templateDetails['Records'][0]['subject'];
                    $data = [
                        'From' => $mpEmail,
                        'To' => $merchant_email,
                        'CC' =>  '',
                        'BCC' =>  '', 
                        'Subject' => $subject,
                        'Body' =>  $emailContent 

                    ];

                    $url =  $baseUrl . '/api/v2/admins/' . $admin_id .'/emails';
                    $sendEDM = callAPI("POST", $admin_token, $url, $data);

            
        }
                    
                    
      //echo json_encode(['result' => $sendEDM]);

         
     }


    function getDistance($latitude1, $longitude1, $latitude2, $longitude2) {  
            $earth_radius = 6371;

            $dLat = deg2rad($latitude2 - $latitude1);  
            $dLon = deg2rad($longitude2 - $longitude1);  

            $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * sin($dLon/2) * sin($dLon/2);  
            $c = 2 * asin(sqrt($a));  
            $d = $earth_radius * $c;  

            return $d;  
            }

            $distance = getDistance(56.130366, -106.34677099999, 57.223366, -106.34675644699);
            if ($distance < 100) {
            //echo "Within 100 kilometer radius";
            } else {
           // echo "Outside 100 kilometer radius";
            }



            function distance($lat1, $lon1, $lat2, $lon2, $unit) {
            if (($lat1 == $lat2) && ($lon1 == $lon2)) {
                return 0;
            } else {
                $theta = $lon1 - $lon2;
                $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
                $dist = acos($dist);
                $dist = rad2deg($dist);
                $miles = $dist * 60 * 1.1515;
                $unit = strtoupper($unit);

                if ($unit == "K") {
                return ($miles * 1.609344);
                } else if ($unit == "N") {
                return ($miles * 0.8684);
                } else {
                return $miles;
                }
            }
            }
   

?>