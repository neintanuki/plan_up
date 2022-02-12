require "test_helper"

class ProjectControllerTest < ActionDispatch::IntegrationTest

  test 'should send create response' do
    # create user
    user = User.create(
      username: "test_username",
      password: "passwordtest1234"
    )
    user.save


    dummy_data = {
      title: "sample title",
      description: "sample description"
    }

    # set cookie
    cookies["jwt_auth"] = JWT.encode(user.id, ENV["API_SALT"])

    post_json '/api/v1/create/project', dummy_data
    assert_response :success

  end
  # test "the truth" do
  #   assert true
  # end
end
