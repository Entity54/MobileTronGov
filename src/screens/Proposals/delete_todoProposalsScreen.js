// import {
//     // Header,
//     // Icon,
//     // Project01a,
//     // PSelectOption,
//     SafeAreaView,
//     // Tag,
//     // Text,
//         // ModalOption,
//         // TabSlider,
//         // CategoryIconSoft,
// } from "@components";

import { SafeAreaView } from "react-native-safe-area-context";

// import { BaseColor, BaseStyle, useTheme } from "@config";
// import { PProject, PProject2Type, PTaskPriority, PTaskStatus, PProject2Action } from "@data";
// import { PProject2 } from "./pProject2";

import Icon from "../../components/Icon";
import Tag from "../../components/Tag";
import {  BaseColor } from "../../config/theme";



// import { useNavigation } from "@react-navigation/native";
// import * as Utils from "@utils";
// import { changeLanguage } from "i18next";
import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View, Text } from "react-native";
// import styles from "./styles";


//ntt54
//dark blue theme
// const  colors = {
//     primary: "#5DADE2",
//     primaryDark: "#1281ac",
//     primaryLight: "#68c9ef",
//     accent: "#FF8A65",
//     background: "#010101",
//     card: "#121212",
//     text: "#e5e5e7",
//     border: "#272729",
// }

//light blue theme
const colors = {
    primary: "#5DADE2",
    primaryDark: "#1281ac",
    primaryLight: "#68c9ef",
    accent: "#FF8A65",
    background: "white",
    card: "#F5F5F5",
    text: "#212121",
    border: "#c7c7cc",
};


const PHome = ({}) => {
    // const navigation = useNavigation();
    // const { t } = useTranslation();
    // const { colors } = useTheme();
    const [type, setType] = useState([]);
    const [status, setStatus] = useState([]);
    const [priority, setPriority] = useState([]);
    const [sort, setSort] = useState("sort");
    // const [projects, setProjects] = useState(PProject2);
    const [showAction, setShowAction] = useState(false);

    // const goProjectDetail = (item) => {
    //     navigation.navigate("PProjectView2", { item: item });
    // };

    // const handleSort = () => {
    //     const projects = [...PProject2];

    //     projects.sort((a, b) => {
    //         var priorityA = a.id;
    //         var priorityB = b.id;
    //         if (priorityB < priorityA) {
    //             return sort == "caret-down" ? -1 : 1;
    //         }
    //         if (priorityB > priorityA) {
    //             return sort == "caret-down" ? 1 : -1;
    //         }

    //         return 0;
    //     });
    //     return projects;
    // };

    // const onSort = () => {
    //     Utils.enableExperimental();
    //     switch (sort) {
    //         case "sort":
    //             setProjects(handleSort());
    //             setSort("caret-down");
    //             break;
    //         case "caret-down":
    //             setProjects(handleSort());
    //             setSort("caret-up");
    //             break;
    //         case "caret-up":
    //             setProjects(PProject);
    //             setSort("sort");
    //             break;
    //         default:
    //             setProjects(PProject);
    //             setSort("sort");
    //             break;
    //     }
    // };

    // const onFilter = (data) => {
    //     if (data.length > 0) {
    //         setProjects(PProject.filter((item) => item.id <= data.length));
    //     } else {
    //         setProjects(PProject);
    //     }
    // };

    // const onChangeType = (type) => {
    //     onFilter(type);
    //     setType(type);
    // };
    // const onChangePriority = (type) => {
    //     onFilter(type);
    //     setPriority(type);
    // };
    // const onChangeStatus = (type) => {
    //     onFilter(type);
    //     setStatus(type);
    // };

    return (
        <SafeAreaView
            // style={[BaseStyle.safeAreaView, { backgroundColor: colors.card }]}
            style={[ { backgroundColor: colors.card }]}

            edges={["right", "top", "left"]}
        >
            {/* <Header
                style={{ backgroundColor: colors.card }}
                title={t("Proposals")}
                renderRight={() => {
                    return (
                        <CategoryIconSoft 
                        style={{ marginTop: 20 }}
                        icon="wifi" />
                    );
                }}

                onPressRight={() => {
                    navigation.navigate("PProjectCreate");
                }}
            /> */}
            {/* <View style={[styles.filter, { borderColor: colors.border }]}>
                <Tag
                    gray
                    style={{
                        borderRadius: 3,
                        backgroundColor: BaseColor.kashmir,
                        marginHorizontal: 5,
                        paddingVertical: 3,
                    }}
                    textStyle={{
                        paddingHorizontal: 4,
                        color: BaseColor.whiteColor,
                    }}
                    icon={
                        <Icon
                            name={sort}
                            color={BaseColor.whiteColor}
                            size={10}
                        />
                    }
                    onPress={onSort}
                >
                    {"Sort Chain"}
                </Tag>
            </View> */}
            
            <FlatList
                contentContainerStyle={{ backgroundColor: colors.card }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={projects}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Project01a
                        title={item.title}
                        description={item.description}
                        status={item.status}
                        tasks={item.tasks}
                        comments={item.comments}
                        tickets={item.tickets}
                        completedTickets={item.completedTickets}
                        // members={item.members}
                        onPress={() => goProjectDetail(item)}
                        onOption={() => setShowAction(true)}
                        style={{
                            paddingBottom: 10,
                            marginBottom: 15,
                            backgroundColor: "white",
                        }}
                    />
                )}
            />
            {/* <ModalOption
                value={{}}
                options={PProject2Action}
                isVisible={showAction}
                onSwipeComplete={() => {
                    setShowAction(false);
                }}
                onPress={(option) => {
                    setShowAction(false);
                }}
            /> */}
        </SafeAreaView>
    );
};

export default PHome;
