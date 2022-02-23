import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Alert, Image } from 'react-native';
import uuid from 'react-native-uuid';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdditionalItem,
  AdditionalItemText,
  AdditionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  id: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  thumbnail_url: string;
  formattedPrice: string;
  extras: Extra[];
  category: number;
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    const { id } = routeParams;
    async function loadFood(): Promise<void> {
      const response = await api.get<Food>(`/foods/${id}`);
      setFood({
        ...response.data,
        formattedPrice: formatValue(response.data.price),
      });

      setExtras(
        response.data.extras.map(extra => ({
          ...extra,
          quantity: 0,
        })),
      );
    }
    loadFood();
  }, [routeParams]);

  function handleIncrementExtra(id: number): void {
    const result = extras.map(extra =>
      extra.id === id ? { ...extra, quantity: extra.quantity + 1 } : extra,
    );

    setExtras(result);
  }

  function handleDecrementExtra(id: number): void {
    const result = extras.map(extra =>
      extra.id === id && extra.quantity > 0
        ? { ...extra, quantity: extra.quantity - 1 }
        : extra,
    );

    setExtras(result);
  }

  function handleIncrementFood(): void {
    setFoodQuantity(state => state + 1);
  }

  function handleDecrementFood(): void {
    foodQuantity === 1 ? 1 : setFoodQuantity(state => state - 1);
  }

  const toggleFavorite = useCallback(async () => {
    if (isFavorite) {
      await api.delete(`/favorites/${food.id}`);

      return;
    }

    const {
      id,
      name,
      description,
      price,
      category,
      image_url,
      thumbnail_url,
    } = food;

    await api.post('favorites', {
      id,
      name,
      description,
      price,
      category,
      image_url,
      thumbnail_url,
    });

    setIsFavorite(state => !state);
  }, [isFavorite, food]);

  const cartTotal = useMemo(() => {
    const valueFood = food.price * foodQuantity;
    const valueExtras = extras
      .map(extra => extra.value * extra.quantity)
      .reduce((total, value) => total + value, 0);

    return formatValue(valueFood + valueExtras);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {
    const id = uuid.v4();
    console.log(id);
    try {
      await api.post('orders', {
        ...food,
        extras,
        id,
        product_id: food.id,
      });

      navigation.navigate('DashboardStack');
    } catch (err) {
      console.log(err);
    }
  }

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdditionalItem key={extra.id}>
              <AdditionalItemText>{extra.name}</AdditionalItemText>
              <AdditionalQuantity>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                  testID={`decrement-extra-${extra.id}`}
                />
                <AdditionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </AdditionalItemText>
                <Icon
                  size={15}
                  color="#6C6C80"
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                  testID={`increment-extra-${extra.id}`}
                />
              </AdditionalQuantity>
            </AdditionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#6C6C80"
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdditionalItemText testID="food-quantity">
                {foodQuantity}
              </AdditionalItemText>
              <Icon
                size={15}
                color="#6C6C80"
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => handleFinishOrder()}>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
