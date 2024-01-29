import * as React from 'react';
import * as RN from 'react-native';
import { database } from '../../config/fb';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function Product({
    id,
    emoji,
    name,
    detalle,
    isCompletad,
}) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedEmoji, setEditedEmoji] = React.useState(emoji);
    const [editedName, setEditedName] = React.useState(name);
    const [editedDetalle, setEditedDetalle] = React.useState(detalle);

    const onDelete = () => {
        RN.Alert.alert(
            'Eliminar tarea',
            '¿Estás seguro de eliminar?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: () => {
                        const docRef = doc(database, 'products', id);
                        deleteDoc(docRef);
                    },
                },
            ],
            { cancelable: true }
        );
    }

    const onEdit = () => {
        const docRef = doc(database, 'products', id);
        updateDoc(docRef, {
            isCompletad: true,
        });
    };

    const onEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const onSaveEdit = () => {
        const docRef = doc(database, 'products', id);
        updateDoc(docRef, {
            emoji: editedEmoji,
            name: editedName,
            detalle: editedDetalle,
        });

        setIsEditing(false);
    };

    const onDiscardEdit = () => {
        setEditedEmoji(emoji);
        setEditedName(name);
        setEditedDetalle(detalle);

        setIsEditing(false);
    };

    return (
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.Text style={styles.emoji}>{emoji}</RN.Text>
                    <RN.View style={{ flexDirection: 'row'}}>
                        <AntDesign onPress={onEditToggle} name="edit" size={24} color="black" style={{ marginRight: 10 }} />
                        <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
                    </RN.View>
                </RN.View>
                {isCompletad ? (
                    <>
                        <RN.Text style={[styles.name, { textDecorationLine: 'line-through' }]}>{name}</RN.Text>
                        <RN.Text style={styles.detalle}>{detalle}</RN.Text>
                        <RN.TouchableOpacity
                            style={[styles.button, { backgroundColor: 'gray' }]}
                        >
                            <RN.Text style={styles.buttonText}>Completado</RN.Text>
                        </RN.TouchableOpacity>
                    </>
                ) : (
                    <>
                        <RN.Text style={styles.name}>{name}</RN.Text>
                        <RN.Text style={styles.detalle}>{detalle}</RN.Text>
                        <RN.TouchableOpacity
                            onPress={onEdit}
                            style={styles.button}
                        >
                            <RN.Text style={styles.buttonText}>Completar tarea</RN.Text>
                        </RN.TouchableOpacity>
                        {isEditing ? (
                            <RN.Modal
                                transparent={true}
                                animationType="slide"
                                visible={isEditing}
                            >
                                <RN.View style={styles.modalContainer}>
                                    <RN.View style={styles.modalContent}>
                                        <RN.TextInput
                                            value={editedEmoji}
                                            onChangeText={setEditedEmoji}
                                            placeholder="Editar emoji"
                                            style={styles.input}
                                        />
                                        <RN.TextInput
                                            value={editedName}
                                            onChangeText={setEditedName}
                                            placeholder="Editar nombre"
                                            style={styles.input}
                                        />
                                        <RN.TextInput
                                            value={editedDetalle}
                                            onChangeText={setEditedDetalle}
                                            placeholder="Editar detalle"
                                            style={styles.input}
                                        />

                                        <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 15 }}>
                                            <RN.View style={{ marginRight: 20 }}>
                                                <RN.Button title="Guardar" onPress={onSaveEdit} />
                                            </RN.View>
                                            <RN.View style={{ marginLeft: 20 }}>
                                                <RN.Button title="Descartar" onPress={onDiscardEdit} />
                                            </RN.View>
                                        </RN.View>

                                    </RN.View>
                                </RN.View>
                            </RN.Modal>
                        ) : null}
                    </>
                )}
            </RN.View>
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    detalle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 5,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 6,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});
