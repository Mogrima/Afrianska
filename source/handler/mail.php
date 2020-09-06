<?php $method = $_SERVER['REQUEST_METHOD'];

$c = true;

$project_name = trim($_POST["project_name"]);
$admin_email  = 'VRATAproject@yandex.ru';
$form_subject = trim($_POST["form_subject"]);

$name = trim(filter_var($_POST["name"]), FILTER_SANITIZE_STRING);
$message  = trim(filter_var($_POST["massage"]), FILTER_SANITIZE_STRING);
$email = trim(filter_var($_POST["email"]), FILTER_SANITIZE_EMAIL);


if (!empty($name) && !empty($message) && !empty($email)) {
  foreach ($_POST as $key => $value) {
    if (is_array($value)) {
      $value = implode(", ", $value);
    }
    if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
      $message .= "
      " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
        <td style='padding: 10px; border: #e2dddd 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e2dddd 1px solid;'>$value</td>
      </tr>
      ";
    }
  }
  $message = "<table style='width: 100%;'>$message</table>";
  $to = 'VRATAproject@yandex.ru';
  $headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $admin_email . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . '' . PHP_EOL;

  mail($admin_email, adopt($form_subject), $message, $headers);
  echo "сообщение отправлено";
} else {
  echo "сообщение не отправлено";
}



function adopt($text)
{
  return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}
