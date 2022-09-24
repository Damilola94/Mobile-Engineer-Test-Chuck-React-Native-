import React, {useState, useEffect} from "react";
import {View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Pressable, Button} from "react-native"
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Feather,MaterialIcons  } from '@expo/vector-icons'; 
import { useDispatch } from "react-redux";
import {fetchSearch} from '../redux/searchSlice';

const HomeScreen = () => {
    const [jokesCategories, setJokesCategories] = useState([]);
    const [description, setDescription] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get("https://api.chucknorris.io/jokes/categories").then(res => {
            setJokesCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleSearch = (description) => {
        if(description.length < 3){
            alert("Invalid search query")
        } else{
            setDescription;
            dispatch(fetchSearch(description))
            navigation.navigate("Search Result")
        }
    };

    return(
        <View style={styles.container}>
            <FlatList
            keyExtractor={(index) => index.toString()}
            data={jokesCategories}
            renderItem={({item}) => 
            <TouchableOpacity 
            style={styles.category} 
            onPress={()=> {
                navigation.navigate("Category Details",{category: item} )
            }}
            >
            <Text style={styles.categoryList}>{item.toUpperCase()}</Text>
            <Text style={styles.categoryList}>🤣</Text></TouchableOpacity>}
            ListHeaderComponent={
                <>
                <View style={styles.search}>
                  <Feather name="search" size={18} color="black" />
                  <TextInput 
                    value={description} 
                    onChangeText={setDescription}
                    multiline 
                    style={styles.name}
                    placeholder="Click here to search for a joke"
                   />
                {description.length > 0 && (<MaterialIcons name="cancel" size={15} color="lightgray" style={styles.icon} onPress={() => setDescription("")}/>)}
                </View>
                <Button onPress={() => handleSearch(description)}title="Search"/>
                </>
              }
            />
        </View>
    )

};

const styles = StyleSheet.create({
    container:{
      width: "100%",
      justifyContent: "flex-start",
      marginBottom: "auto",
      padding: 20
    },
    category:{
        display: "flex",
        width: "100%",
        height: 100,
        backgroundColor: "#98817B",
        borderRadius:5,
        borderColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical:10 ,
        padding: 10,
        paddingHorizontal: 20,
        justifyContent:"space-between" ,
        alignItems:"center",
        flexDirection: "row"
    },
    categoryList:{
        fontSize: 20,
        fontWeight:"600",
        color: "white"
    },
    search: {
        padding: 10,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
      },
    name: {
        color: "gray",
        marginLeft: 5
      },
    icon: {
        marginLeft: "auto",
      },
});

export default HomeScreen;

