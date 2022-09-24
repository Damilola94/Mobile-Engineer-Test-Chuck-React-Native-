import React, {useState, useEffect} from "react";
import {View, Text,  StyleSheet,  Image} from "react-native"
import axios from "axios";
import moment from "moment/moment";
import { MaterialIcons } from '@expo/vector-icons'; 
import {  useRoute } from "@react-navigation/native";

const getFormatedDate = (date, format = "MMM DD, YYYY") => moment(date).format(format);

const HomeScreen = () => {
    const [jokesCategories, setJokesCategories] = useState([]);
    const route = useRoute();
    const {params} = route

    useEffect(() => {
        axios.get(`https://api.chucknorris.io/jokes/random?category=${params?.category}`).then(res => {
            setJokesCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [params,route])

    return(
        <View style={styles.container}>
            <View style={styles.row}>
            <Text style={styles.categoriesDetail}>Name of Category:</Text>
           <Text style={styles.categoriesDetail}>{jokesCategories?.categories?.toString()?.toUpperCase()}</Text>
            </View>
            {jokesCategories?.icon_url === "not found" ? <Image source={{uri:jokesCategories?.icon_url }} style={styles.icon_urlStyle}/> :<MaterialIcons name="error" size={34} color="black" /> }
            <View style={{marginVertical:10 }}>
            <Text style={styles.categoriesDetail}>Joke</Text>
           <Text>{jokesCategories?.value}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.categoriesDetail}>Date Created:</Text>
           <Text style={styles.categoriesDetail}>{getFormatedDate(jokesCategories?.created_at, "YYYY/MMM/DD")}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.categoriesDetail}>Date Updated:</Text>
           <Text style={styles.categoriesDetail}>{getFormatedDate(jokesCategories?.updated_at, "YYYY/MMM/DD")}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
      width: "90%",
      justifyContent: "center",
      marginBottom: "auto",
      marginVertical: "10%",
      marginHorizontal: "5%",
      padding: 20,
      shadowColor:"gray",
      shadowOffset: {
        width: 5,
        height: 5
      },
      shadowOpacity:0.1, 
      backgroundColor: "#fff",
      borderRadius: 5
    },
    icon_urlStyle:{
        width: 40,
        height:40,
        borderRadius:25,
        marginRight: 10
    },
    categoriesDetail:{
        fontSize: 18,
        fontWeight: "500"
    },
    row :{
        flexDirection:"row", justifyContent: "space-between", marginBottom:10 
    }
});

export default HomeScreen;

