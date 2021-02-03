<%
'Declarando variveis
Dim sNameTo, sNameFrom, sEmailFrom, sText, sEmailTo, sAssunto

'Pegando os dados digitados nos campos e colocando em variaveis
sNameFrom = Request.Form("nome")
sEmailFrom = Request.Form("email")
sEmailTo = " paulo@ligatech.com.br"
sNameTo = "Ligatech"
sText = Request.Form("mensagem")
sAssunto = Request.Form("assunto")

'Cria o objeto
  set mailer = server.createobject("SMTPsvg.Mailer")
  Mailer.FromName = sNameFrom
  Mailer.FromAddress = sEmailFrom
'Host para envio de emails
  Mailer.RemoteHost = "email-ssl.com.br:465:1"
  Mailer.AddRecipient sEmailTo, sNameTo
  Mailer.Subject = sAssunto  & " - E-mail"

'Monta a texto para o envio
  strMsgHeader = sNameFrom & "(" & sEmailFrom & ") " & " quem enviou! " & vbCrLf & vbCrLf
  strMsgFooter = sText
  Mailer.BodyText = strMsgHeader & strMsgFooter
' Se for enviado redirecionar para obrigado.asp
  if Mailer.SendMail then
     Response.Redirect "obrigado.asp"
  else
' Se não for enviado mostra o erro que ocoreu
     Response.Write ("Ocorreu um erro.<BR>")
     Response.Write ("O Erro é " & Mailer.Response)
  end if
%>