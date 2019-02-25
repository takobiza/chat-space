require 'csv'

CSV.generate do |csv|
  column_names = %w(投稿者 投稿 投稿日時)
  csv << column_names
  @messages.each do |message|
    column_values = [
      message.user.nickname,
      (message.body?) ? message.body : "画像が投稿されています",
      message.created_at.strftime("%Y/%m/%d %H:%M")
    ]
    csv << column_values
  end
end


