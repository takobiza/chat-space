$(function() {
    var search_list = $("#user-search-result");

    function appendUser(user) {
        var html = `
                  <div class='chat-group-user clearfix'>
                    <input name='chat_group[user_ids][]' type='hidden' value=${user.id}>
                    <p class='chat-group-user__name'>${user.nickname}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.nickname}>追加</a>
                  </div>`
        search_list.append(html);
    }

    function appendNoUser(user) {
        var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>${user}</p>
                  </div>
                </div>`
        search_list.append(html);
    }

    function addUser(user_id, user_name) {
        var html = `<div class='chat-group-user clearfix add-users'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
        $('.chat-group-form__field--right#chat_group_users').append(html);
    }

    function filterUsers(users) {
        var user_ids = $('#chat_group_users .add-users input:hidden').map(function() { return this.value; });
        users.map(function(user, index) {
            for (var id of user_ids) {
                if (user.id == id) {
                    delete users[index];
                }
            }
        });
        filter_users = users.filter(v => v);
        return filter_users;
    }

    $(function() {
        $("#user-search-field").on("keyup", function() {
            var input = $.trim($("#user-search-field").val());
            if (input == "") {
                $("#user-search-result").empty();
            } else {
                $.ajax({
                        type: 'GET',
                        url: '/users',
                        data: { keyword: input },
                        dataType: 'json'
                    })
                    .done(function(users) {
                        $("#user-search-result").empty();
                        users = filterUsers(users);
                        if (users.length !== 0) {
                            users.forEach(function(user) {
                                appendUser(user);
                            });
                        } else {
                            appendNoUser("一致するユーザーがいません");
                        }
                    }).fail(function() {
                        alert('ユーザー検索に失敗しました');
                    });
            }
        });
    });

    $(document).on("click", ".user-search-add", function() {
        var user_id = $(this).data('user-id');
        var user_name = $(this).data('user-name');
        addUser(user_id, user_name);
        $(this).parent().remove();
    });

    $(document).on("click", ".js-remove-btn", function() {
        $(this).parent().remove();
    });

});
