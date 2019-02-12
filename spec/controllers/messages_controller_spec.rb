require 'rails_helper'

describe MessagesController do

  describe "GET #index" do

    describe 'ログインしている場合' do

      it "アクション内で定義している@groupが存在する" do
        user = create(:user)
        login_user(user)
        group = create(:group)
        get :index, params: { group_id: group}
        expect(assigns(:group)).to eq group
      end

      it 'assigns @message' do
        user = create(:user)
        login_user(user)
        group = create(:group)
        get :index, params: { group_id: group}
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "意図したビューにリダイレクトできているか" do
        user = create(:user)
        login_user(user)
        group = create(:group)
        get :index, params: { group_id: group}
        expect(response).to render_template :index
      end

    end

    describe 'ログインしていない場合' do

      it "意図したビューにリダイレクトできているか" do
        group = create(:group)
        get :index, params: { group_id: group}
        expect(response).to redirect_to "/users/sign_in"
      end

    end
  end

  describe "POST #create" do

    describe 'ログインしている場合' do
      it "アクション内で定義している@groupが存在する" do
        user = create(:user)
        login_user(user)
        message = create(:message).attributes
        group = create(:group)
        post :create, params: {group_id: group, message: message}
        expect(assigns(:group)).to eq group
      end

      describe 'ログインしているかつ、保存に成功した場合' do

        it "アクション内で定義している@messageが保存された" do
          user = create(:user)
          login_user(user)
          message = create(:message).attributes
          group = create(:group)
          expect{post :create, params: {group_id: group, message: message}}.to change(Message, :count).by(1)
        end

        it "意図したビューにリダイレクトできているか" do
          user = create(:user)
          login_user(user)
          message = create(:message).attributes
          group = create(:group)
          post :create, params: {group_id: group, message: message}
          expect(response).to redirect_to group_messages_path(group)
        end
      end

      describe 'ログインしているが、保存に失敗した場合' do

        it "アクション内で定義している@messageが保存されなかった" do
          user = create(:user)
          login_user(user)
          message = create(:message).attributes
          group = create(:group)
          expect{post :create, params: {group_id: group, message: message}}.to change(Message, :count)
        end

        it "意図したビューにリダイレクトできているか" do
          user = create(:user)
          login_user(user)
          message = build(:message, body: nil, image: nil).attributes
          group = create(:group)
          post :create, params: {group_id: group, message: message}
          expect(response).to render_template :index
        end
      end

    end

    describe 'ログインしていない場合' do

      it "意図したビューにリダイレクトできているか" do
        message = create(:message).attributes
        group = create(:group)
        post :create, params: {group_id: group, message: message}
        expect(response).to redirect_to "/users/sign_in"
      end

    end
  end
end
