<?php


            //load coupon values here.
            // include 'callAPI.php';
            // include 'admin_token.php';

            

            // $baseUrl = getMarketplaceBaseUrl();
            // $admin_token = getAdminToken();
            // $customFieldPrefix = getCustomFieldPrefix();
            // // 'Operator' => 'equal', 
           
            // $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_list';
            // $couponDetails =  callAPI("GET",  null, $url, false);

            // foreach($couponDetails['Records'] as $record) {
            //         $url =  $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_list/rows/'. $record['Id'];
            //         $result =  callAPI("DELETE", null, $url);
            // }

           // echo json_encode(['result' => $couponDetails['Records']]);

    

require 'api.php';
require 'callAPI.php';
$API = new API();

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);
$packageId = $API->getPackageID();


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

$tempoId = $packageId;

//update the freelancer_quotes table

$templates = array(array('Name' => 'job_id', "Operator" => "equal",'Value' => $content['jobId']), array('Name' =>
'freelancer_id', "Operator" => "equal",'Value' => $content['freelancerId']) );
$url = $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_quotes';
$quoteDetails = callAPI("POST", $admin_token, $url, $templates);

$quote_id = $quoteDetails['Records'][0]['Id'];


//get the freelancers name
$templates = array(array('Name' => 'user_id', "Operator" => "equal",'Value' => $content['freelancerId']) );
$url = $baseUrl . '/api/v2/plugins/'. $packageId .'/custom-tables/freelancer_details';
$userDetails = callAPI("POST", $admin_token, $url, $templates);

$user_name = $userDetails['Records'][0]['company_name'];
$user_email = $userDetails['Records'][0]['email'];


$quote_details = [

'status' => $content['status']

];

$response = $API->editRowEntry($packageId, 'freelancer_quotes', $quote_id, $quote_details);

//update quote table


$quote_details = [

'status' => $content['status']

];

$response = $API->editRowEntry($packageId, 'job_quotes', $content['quoteId'], $quote_details);


//send EDM
if ($content['status'] == 'Accepted') {

     $templates = array(array('Name' => 'title', "Operator" => "in",'Value' => 'Quotation Accepted'));
    $url =  $baseUrl . '/api/v2/plugins/'. $tempoId .'/custom-tables/Templates';
  
    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $content = $templateDetails['Records'][0]['contents'];
    
    $token = array(
      'Logo'  => $mplogo1,
      'MarketplaceUrl' => $mplink,
      'MarketName' => $mpname,
      'ImageUrl' => $item_image,
      'SellerName' => $user_name,
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


    $templates = array(array('Name' => 'title', "Operator" => "in",'Value' => 'Quotation Rejected'));
    $url =  $baseUrl . '/api/v2/plugins/'. $tempoId .'/custom-tables/Templates';
  
    $templateDetails =  callAPI("POST", $admin_token, $url, $templates);

    $content = $templateDetails['Records'][0]['contents'];
    
    $token = array(
      'Logo'  => $mplogo1,
      'MarketplaceUrl' => $mplink,
      'MarketName' => $mpname,
      'ImageUrl' => $item_image,
      'SellerName' => $user_name,
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
 







// $url = $baseUrl . '/api/v2/users/';
// $result = callAPI("GET", $admin_token, $url, false);
// $admin_id = $result['ID'];

// $emailContentApproved = "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999;
//     font-size:16px; font-family:sans-serif; line-height:25px;\">
//     <div style=\"padding:15px;\">
//         <div style=\"text-align:center; margin-bottom:50px;\"><img
//                 src=\"http://bootstrap.arcadier.com/marketplace/images/logo.png\" style=\"max-width:200px;\"></div>
//         <div style=\"\">
//             <p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{Freelancer Name}},</p>
//             <p>Your job application has been approved.</p>
//             <p>Please wait for your marketplace owner to contact you for more details regarding the tasks ahead.</p>
//         </div>
//         <div style=\"text-align:center; margin-top:100px; margin-bottom:100px\"> <a href=\"#\" style=\"font-size: 18px;
//                 background-color: #FF5A60; text-decoration: none; color: #fff; padding:11.5px 30px; border-radius: 50px;
//                 width: 180px; display: inline-block;\">VIEW INFO</a></div>
//         <div style=\"margin-bottom:50px;\">
//             <p>Regards,<br>MarketplaceName</p>
//             <p><a style=\"color:#FF5A60; font-size:17px; font-weight:bold; text-decoration:none;\"
//                     href=\"http://www.marketplace.com\">www.marketplace.com</a></p>
//         </div>
//     </div>
// </div>";


// $emailContentRejected = "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999;
//     font-size:16px; font-family:sans-serif; line-height:25px;\">
//     <div style=\"padding:15px;\">
//         <div style=\"text-align:center; margin-bottom:50px;\"> <img
//                 src=\"http://bootstrap.arcadier.com/marketplace/images/logo.png\" style=\"max-width:200px;\"> </div>
//         <div style=\"\">
//             <p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ Freelancer Name }},</p>
//             <p>Your job application has been rejected.</p>
//             <p>If you have further enquiries, please contact us.</p>
//         </div>
//         <div style=\"text-align:center; margin-top:100px; margin-bottom:100px\"><a href=\"#\" style=\"font-size: 18px;
//                 background-color: #FF5A60; text-decoration: none; color: #fff; padding:11.5px 30px; border-radius: 50px;
//                 width: 180px; display: inline-block;\">VIEW INFO</a> </div>
//         <div style=\"margin-bottom:50px;\">
//             <p>Regards,<br>MarketplaceName</p>
//             <p><a style=\"color:#FF5A60; font-size:17px; font-weight:bold; text-decoration:none;\"
//                     href=\"http://www.marketplace.com/\">www.marketplace.com</a></p>
//         </div>
//     </div>
// </div>";


// $subject = $content['status'] == 'Accepted' ? 'Accepted' : 'Rejected';
// $emailContent = $content['status'] == 'Accepted' ? $emailContentApproved : $emailContentRejected;

// $data = [
// 'From' => 'marketplace@email.com',
// 'To' => 'applicant@gmail.com',
// 'Subject' => $subject,

// 'Body' => $emailContent
// ];

// $url = $baseUrl . '/api/v2/admins/' . $admin_id . '/emails';
// $sendEDM = callAPI("POST", $admin_token, $url, $data);
// echo json_encode(['result' => $sendEDM]);

?>