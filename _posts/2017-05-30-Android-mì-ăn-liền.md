Sau khi hoàn thành app mì ăn liền thì tự nhiên nhận ra rất nhiều thứ và rất nhiều câu hỏi khi phát triển app android.

##Ghi lại để khi nào tự trả lời hay tự nhận thức được

Điểm xuất phát là một ít java và một ít lý thuyết đọc ở đâu đó hồi sinh viên

# Nguồn tài liệu
[Android code path](https://github.com/codepath/android_guides):

- Tài liệu từ repo này nó hay ở chỗ là mình có thể tổng quang được những thứ cần thiết như layout, listview, event, viewholder. 
Từ mấy thứ đó muốn chi tiết hơn nó bản chất như thế nào thì mình xem thêm quyển dưới. Xoay qua lại hai cái này để nắm bắt những cái cần phải làm
và keyword để search google.
- Biết được tổ chức thư mục hợp lý.

Quyển sách CommonsWare The busy coders guide to android development:

- Rất thích quyển này nó đi từ cơ bản rồi đến chuyên sâu, mô tả đẩy đủ thành phần. Quyển này giúp mình nằm manifest file, rồi gradle, 
IDE android studio. Đặc biệt phần fragment với listview. Xem cách lưu dữ liệu nơi máy rồi giao tiếp với server.

# Mấy thứ chưa hiểu và kinh nghiệm viết app ban đầu.
- Chưa biết các xử lý recycle view cho các listview.
- Nắm phần lifecycle activity nhưng không biết các kết hợp hợp lý giữa các activity, khi nào nên finish rồi reopen nó, hay là destroy.
- Giao tiếp với server thì cứ mỗi activity thì có một cái asyn task, sử dụng rất nhiều lớp asyntask chưa biết cách gộp nó vào chung
một thứ.
- Đối với dữ liệu để hiển thị hiện tại dùng một lớp Dataholder để dùng cho nhiều activity thay vì put intent value vào nó. Dataholder 
là một singeton pattern, học được từ phần java review code hồi trước.
- Activity group, activity cha con. 
- Hiện tại fragment chỉ ngang mức dùng nó để tránh dùng nhiều activity vì nhiều activity sẽ có chung ít nhất một component, nên dùng fragment 
sẽ hay hơn.
- Đối với fragment sẽ có hai hàm cần lưu ý và doInBackgroud và postExecute. Lưu ý cần phải xử lý ngoại lệ không kết nối đến server để tránh
crassh app, do gọi activity khác nằm ở doInBackground nên khi không xử lý sẽ bị crassh. và nhớ bắt ngoại lệ này và thông báo bằng một
dialog.
- Xử dùng gson thư viện Json của google để đọc ghi file json đơn giản để implement, khá hay.
- Do dùng socket programing để giao tiếp đến server nên nếu dùng json và để gửi thì nó sẽ đơn giản việc parser rồi quy định cấu trúc.
- Chưa xử lý splash khi đứt kết nối một cách hợp lý, và cố gắng kết nối.

## Góc nhìn từ một thằng gà học code

