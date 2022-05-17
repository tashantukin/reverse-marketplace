<?php
    require 'api.php';
   require 'callAPI.php';
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



    $baseUrl = $API->getMarketplaceBaseUrl();
    $admin_token = $API->AdminToken();

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


    $templates = array(array('Name' => 'Id', "Operator" => "equal",'Value' => $content['Id']) );
    $url =  $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_details';
    $freelancerDetails =  callAPI("POST", $admin_token, $url, $templates);

    $name = $freelancerDetails['Records'][0]['company_name'];
    $user_email = $freelancerDetails['Records'][0]['email'];
   
    if ($content['status'] == 'Approved') {

     $templates = array(array('Name' => 'Id', "Operator" => "in",'Value' => 'bd61f087-b718-4396-b947-534ab382f3c0'));
    $url =  $baseUrl . '/api/v2/plugins/'. $tempoId .'/custom-tables/Templates';
  
    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $content = $templateDetails['Records'][0]['contents'];
    
    $token = array(
      'Logo'  => $mplogo1,
      'MarketplaceUrl' => $mplink,
      'MarketName' => $mpname,
      'ImageUrl' => $item_image,
      'SellerName' => $name,
      'AdminName' => $admin_name,
      'CompanyName' => 'Company Name',


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
          'To' => $user_email,
          'CC' =>  '',
          'BCC' =>  '', 
          'Subject' => $subject,
          'Body' =>  $emailContent 

      ];

      $url =  $baseUrl . '/api/v2/admins/' . $admin_id .'/emails';
      $sendEDM = callAPI("POST", $admin_token, $url, $data);
      echo json_encode(['result' => $sendEDM]);

}else {

  error_log('company name ' . $name);
    $templates = array(array('Name' => 'Id', "Operator" => "in",'Value' => 'ac8c6077-2078-4045-ad71-4ea95c3ca4db'));
    $url =  $baseUrl . '/api/v2/plugins/'. $tempoId .'/custom-tables/Templates';
  
    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $content = $templateDetails['Records'][0]['contents'];
    
    $token = array(
      'Logo'  => $mplogo1,
      'MarketplaceUrl' => $mplink,
      'MarketName' => $mpname,
      'ImageUrl' => $item_image,
      'SellerName' =>  $name,
      'AdminName' => $admin_name,
      'CompanyName' => 'Company Name',


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
          'To' => $user_email,
          'CC' =>  '',
          'BCC' =>  '', 
          'Subject' => $subject,
          'Body' =>  $emailContent 

      ];

      $url =  $baseUrl . '/api/v2/admins/' . $admin_id .'/emails';
      $sendEDM = callAPI("POST", $admin_token, $url, $data);
      echo json_encode(['result' => $sendEDM]);

}
   

   

?>