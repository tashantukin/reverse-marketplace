<?php
    require 'api.php';
    include 'callAPI.php';
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


        'stripe_key' => $content['stripe_key'],
        'location_coordinates' => $content['location_coordinates'],
        'servicing_area_coords' => $content['servicing_coords'],
        'is_payment_onboarded' => $content['is_payment_onboarded'],
        

        'full_address' => $content['full_address'],
        'email'=> $content['email'], 
        'company_name' => $content['company_name'],  
        'country' => $content['country'] ,
        'state' => $content['state'],
        'city' => $content['city'],
        'postal_code' => $content['postal-code'],
        'contact_number' => $content['contact-number']
        
    ];

    $response = $API->createRowEntry($packageId, 'freelancer_details', $freelancer_details);

    echo json_encode($response);


    //edm to the admin

    $admin_token = $API->AdminToken();
    $baseUrl = $API->getMarketplaceBaseUrl();
    
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


    $tempoId = 'ed0f2131-3ef2-4ef1-9fb8-e20224eb1887';


    $templates = array(array('Name' => 'Id', "Operator" => "in",'Value' => '9a733374-1e37-47e1-9d96-128eb4bfb15f'));
    $url =  $baseUrl . '/api/v2/plugins/'. $tempoId .'/custom-tables/Templates';
  

    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);


    $content = $templateDetails['Records'][0]['contents'];
    
    
    $token = array(
      'Logo'  => $mplogo1,
      'MarketplaceUrl' => $mplink,
      'MarketName' => $mpname,
      'ImageUrl' => $item_image,
      'InvoiceNo' => $invoiceId,
      'Booking' => $items_div,
      'BookingHistory' => $purchaseLink,
      'SellerDetails' => $seller_details,
      'AdminName' => $admin_name,
      'CompanyName' => $content['company_name'],
    );

    $pattern = '{{ %s }}';
  
    foreach ($token as $key => $val) {
        $varMap[sprintf($pattern, $key)] = $val;
    }

    $emailContent = strtr($content, $varMap);


      //send EDM
    $subject = $templateDetails['Records'][0]['subject'];
      $data = [
          'From' => $mpEmail,
          'To' => $mpEmail,
          'CC' =>  '',
          'BCC' =>  '', //explode(',','solehatechqalead@gmail.com'),
          'Subject' => $subject,
          'Body' =>  $emailContent 

      ];

      $url =  $baseUrl . '/api/v2/admins/' . $admin_id .'/emails';
      $sendEDM = callAPI("POST", $admin_token, $url, $data);
      echo json_encode(['result' => $sendEDM]);


//     $emailContent = "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">
//     <div style=\"padding:15px;\"> 
    
//        <div style=\"text-align:center; margin-bottom:50px;\">
//           <img src=\"http://bootstrap.arcadier.com/marketplace/images/logo.png\" style=\"max-width:200px;\">
//       </div>
      
//       <div style=\"\">
//           <p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Hi ,</p>
//           <p>" . $content['company_name'] . " has registered to the marketplace. </p>
//           <p>You may view his/her information.</p>
//       </div>
  
//       <div style=\"text-align:center; margin-top:100px; margin-bottom:100px;\">
//           <a href=\"#\" style=\"font-size: 18px; background-color: #FF5A60; text-decoration: none; color: #fff; padding:11.5px 30px; border-radius: 50px; width: 180px; display: inline-block;\">VIEW INFO</a>
//       </div>
      
      
//       <div style=\"margin-bottom:50px;\">
//           <p>Regards,<br>Arcadier</p>
//       </div>
      
  
//        </div>   
//    </div>";
    // $data = [
    //     'From' => 'marketplace@email.com',
    //     'To' =>  'adminemail@gmail.com',
    //     'Subject' => 'New Registration',
    
    //     'Body' =>  $emailContent
    // ];
    
    // $url =  $baseUrl . '/api/v2/admins/' . $admin_id . '/emails';
    // $sendEDM = callAPI("POST", $admin_token, $url, $data);
    // echo json_encode(['result' => $sendEDM]);






?>