// screens/ArticleScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ArticleScreen = ({ route }) => {
  const { article } = route.params;
  const defaultImage = 'https://img.freepik.com/free-vector/breaking-news-live-streaming-concept_23-2148500721.jpg?t=st=1721646152~exp=1721649752~hmac=0dbd77a2a1c5c9fec65b8c9e8e9ee8db3029d7930746f72f4404cee0e481ea75&w=826';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage || defaultImage}} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>By {article.author || 'Unknown Author'}</Text>
      <Text style={styles.date}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
      <Text style={styles.content}>{article.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ArticleScreen;
