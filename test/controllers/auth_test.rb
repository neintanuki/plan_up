require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  # success login response
  test "should send login response" do
    # dummy data
    dummy_data = {
      username: 'test',
      password: 'test12345'
    }

    # save data
    user = User.create(
      username: dummy_data[:username],
      password: dummy_data[:password]
    )
    user.save

    # test request
    post_json '/api/v1/user/login', dummy_data
    assert_response :success
  end

  # fail login response
  test "should send login error response" do
    # test request
    post_json '/api/v1/user/login', { username: 'test_name', password: "abc12345" }
    assert_response :unauthorized
  end

  # success register response
  test "should send register response" do
    # test request
    post_json '/api/v1/user/register', { username: 'test_name', password: "abc12345" }
    assert_response :success
  end

  # fail register response
  test "should send register error response" do
    # test request
    post_json '/api/v1/user/register', { username: '', password: "" }
    assert_response :unauthorized
  end


  # test "the truth" do
  #   assert true
  # end
end
