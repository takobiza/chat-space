json.array! @new_message.each do |message|
  json.nickname message.user.nickname
  json.time message.created_at.strftime("%Y/%m/%d %H:%M")
  json.body message.body
  json.image message.image.url
  json.id message.id
end
