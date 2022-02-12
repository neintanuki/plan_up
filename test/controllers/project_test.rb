require "test_helper"

class ProjectControllerTest < ActionDispatch::IntegrationTest

  test 'should send create response' do
    create_user

    dummy_data = {
      title: "sample title",
      description: "sample description"
    }

    post_json '/api/v1/create/project', dummy_data
    assert_response :success

  end

  test 'should send create error response' do
    create_user

    dummy_data = {
      title: "  invalid sample title",
      description: "  invalid sample description"
    }

    post_json '/api/v1/create/project', dummy_data
    assert_response :bad_request
  end

  test 'should send new response' do
    create_user

    get '/api/v1/project'

    assert_response :success
  end

  # test "the truth" do
  #   assert true
  # end

  def create_user
    # create user
    user = User.create(
      username: "test_username",
      password: "passwordtest1234"
    )
    user.save

    set_cookie(user.id)

  end

  def set_cookie(id)
    cookies["jwt_auth"] = JWT.encode(id, ENV["API_SALT"])
  end
end
