import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 模拟数据
const POSTS = [
  {
    id: '1',
    username: 'instagram_official',
    avatar: 'https://via.placeholder.com/150',
    imageUrl: 'https://via.placeholder.com/600',
    likes: 1234,
    caption: '欢迎来到Instagram！',
    comments: 45,
    timeAgo: '2小时前',
  },
  {
    id: '2',
    username: 'travel_lover',
    avatar: 'https://via.placeholder.com/150',
    imageUrl: 'https://via.placeholder.com/600',
    likes: 892,
    caption: '美丽的风景 #旅行 #自然',
    comments: 23,
    timeAgo: '3小时前',
  },
  {
    id: '3',
    username: 'food_photography',
    avatar: 'https://via.placeholder.com/150',
    imageUrl: 'https://via.placeholder.com/600',
    likes: 756,
    caption: '今天的美食 #美食 #摄影',
    comments: 18,
    timeAgo: '5小时前',
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 处理登录
  const handleLogin = () => {
    // 简单的登录逻辑，实际应用中需要API调用
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  // 登录页面
  const LoginScreen = () => (
    <View style={styles.loginContainer}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Instagram</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="用户名、电子邮箱或手机号码"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="密码"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.loginButton, (!username || !password) && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={!username || !password}
        >
          <Text style={styles.loginButtonText}>登录</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.forgotPassword}>忘记密码？</Text>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>没有账号？</Text>
          <Text style={styles.signupLink}>注册</Text>
        </View>
      </View>
    </View>
  );

  // 单个帖子组件
  const Post = ({ post }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <Text style={styles.moreIcon}>•••</Text>
      </View>

      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <Text style={styles.actionIcon}>♥</Text>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionIcon}>↪</Text>
        </View>
        <Text style={styles.actionIcon}>🔖</Text>
      </View>

      <View style={styles.postDetails}>
        <Text style={styles.likes}>{post.likes} 人赞了</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
        <Text style={styles.viewComments}>查看全部 {post.comments} 条评论</Text>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </View>
  );

  // 首页
  const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerLogo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.headerIcon}>♥</Text>
          <Text style={styles.headerIcon}>✉</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.stories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {POSTS.map(post => (
              <View key={post.id} style={styles.storyItem}>
                <Image source={{ uri: post.avatar }} style={styles.storyAvatar} />
                <Text style={styles.storyUsername}>
                  {post.username.length > 10
                    ? post.username.substring(0, 10) + '...'
                    : post.username}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={POSTS}
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={styles.tabBar}>
        <Text style={styles.tabIcon}>🏠</Text>
        <Text style={styles.tabIcon}>🔍</Text>
        <Text style={styles.tabIcon}>➕</Text>
        <Text style={styles.tabIcon}>📹</Text>
        <Image source={{ uri: POSTS[0].avatar }} style={styles.tabAvatar} />
      </View>
    </SafeAreaView>
  );

  return <View style={styles.container}>{isLoggedIn ? <HomeScreen /> : <LoginScreen />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // 登录页样式
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  form: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fafafa',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#3897f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#b2dffc',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#003569',
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: '#999',
  },
  signupLink: {
    color: '#003569',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  // 主页样式
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    fontSize: 24,
    marginLeft: 15,
  },
  // 故事列表样式
  stories: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e95950',
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
  },
  // 帖子样式
  post: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  moreIcon: {
    fontSize: 20,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  postDetails: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  caption: {
    flex: 1,
    flexWrap: 'wrap',
  },
  viewComments: {
    color: '#999',
    marginTop: 5,
  },
  timeAgo: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  // 底部导航栏
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabIcon: {
    fontSize: 24,
  },
  tabAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
