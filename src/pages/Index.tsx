import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  image: string;
  highlights: string[];
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Путешествие к Сулакскому каньону',
    description: 'Исследуйте один из самых глубоких каньонов в мире с потрясающими видами на бирюзовую реку',
    price: 15000,
    duration: 3,
    difficulty: 'Средний',
    image: 'https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/27e9f845-d9fa-4c9e-8a40-6129a6d7c24a.jpg',
    highlights: ['Сулакский каньон', 'Прогулка на катере', 'Фотосессия']
  },
  {
    id: 2,
    title: 'Восхождение на Базардюзю',
    description: 'Покорите самую южную точку России высотой 4466 метров',
    price: 35000,
    duration: 7,
    difficulty: 'Сложный',
    image: 'https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/d6329fe4-a638-4d05-a4f6-a1248f0a84b0.jpg',
    highlights: ['Альпинизм', 'Горные лагеря', 'Инструктор']
  },
  {
    id: 3,
    title: 'Тур по аулам Дагестана',
    description: 'Погрузитесь в традиционную культуру горных селений',
    price: 12000,
    duration: 4,
    difficulty: 'Легкий',
    image: 'https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/e46f9660-cae2-43e0-b188-692c5c2460c1.jpg',
    highlights: ['Аул Чох', 'Дегустация', 'Мастер-классы']
  },
  {
    id: 4,
    title: 'Треккинг по Самурскому лесу',
    description: 'Уникальный лиановый лес на берегу Каспийского моря',
    price: 8000,
    duration: 2,
    difficulty: 'Легкий',
    image: 'https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/27e9f845-d9fa-4c9e-8a40-6129a6d7c24a.jpg',
    highlights: ['Лиановый лес', 'Каспийское море', 'Птицы']
  },
  {
    id: 5,
    title: 'Джип-тур по горному Дагестану',
    description: 'Экстремальное путешествие по горным перевалам и древним крепостям',
    price: 20000,
    duration: 5,
    difficulty: 'Средний',
    image: 'https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/d6329fe4-a638-4d05-a4f6-a1248f0a84b0.jpg',
    highlights: ['Внедорожник', 'Крепости', 'Водопады']
  },
  {
    id: 6,
    title: 'Каспийское побережье',
    description: 'Отдых на пляжах и термальных источниках',
    price: 10000,
    duration: 3,
    difficulty: 'Легкий',
    image: 'https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/e46f9660-cae2-43e0-b188-692c5c2460c1.jpg',
    highlights: ['Пляжи', 'Термальные источники', 'СПА']
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Алексей Морозов',
    avatar: '👨',
    rating: 5,
    text: 'Незабываемое приключение! Сулакский каньон превзошёл все ожидания. Организация на высоте!',
    tour: 'Сулакский каньон'
  },
  {
    id: 2,
    name: 'Мария Петрова',
    avatar: '👩',
    rating: 5,
    text: 'Восхождение на Базардюзю было настоящим вызовом. Благодарю команду за профессионализм!',
    tour: 'Базардюзю'
  },
  {
    id: 3,
    name: 'Дмитрий Соколов',
    avatar: '👨',
    rating: 5,
    text: 'Культурный тур открыл для меня Дагестан с совершенно новой стороны. Гостеприимство местных жителей поразило!',
    tour: 'Аулы Дагестана'
  }
];

function Index() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000]);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const filteredTours = tours.filter(tour => {
    const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    const durationMatch = durationFilter === 'all' || 
      (durationFilter === 'short' && tour.duration <= 3) ||
      (durationFilter === 'medium' && tour.duration > 3 && tour.duration <= 5) ||
      (durationFilter === 'long' && tour.duration > 5);
    const difficultyMatch = difficultyFilter === 'all' || tour.difficulty === difficultyFilter;
    
    return priceMatch && durationMatch && difficultyMatch;
  });

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Mountain" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">Дагестан</span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('tours')} className="text-sm font-medium hover:text-primary transition-colors">
              Туры
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-sm font-medium hover:text-primary transition-colors">
              Галерея
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">
                <Icon name="Calendar" className="mr-2" size={18} />
                Забронировать
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Бронирование тура</DialogTitle>
                <DialogDescription>
                  Заполните форму и мы свяжемся с вами в ближайшее время
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 999-99-99" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tour">Выберите тур</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тур" />
                    </SelectTrigger>
                    <SelectContent>
                      {tours.map(tour => (
                        <SelectItem key={tour.id} value={tour.id.toString()}>
                          {tour.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea id="message" placeholder="Дополнительные пожелания..." />
                </div>
              </div>
              <Button className="w-full" size="lg">Отправить заявку</Button>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main>
        <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/27e9f845-d9fa-4c9e-8a40-6129a6d7c24a.jpg"
              alt="Горы Дагестана"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          
          <div className="container relative z-10 px-4 text-center text-white animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              Откройте для себя Дагестан
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-lg">
              Путешествия, которые изменят ваш взгляд на мир. Величественные горы, древние аулы и незабываемые приключения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('tours')}>
                <Icon name="Compass" className="mr-2" size={20} />
                Выбрать тур
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-foreground" onClick={() => scrollToSection('contacts')}>
                <Icon name="Phone" className="mr-2" size={20} />
                Связаться с нами
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <Icon name="ChevronDown" className="text-white" size={32} />
          </div>
        </section>

        <section id="tours" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши туры</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Выберите идеальное приключение с помощью фильтров
              </p>
            </div>

            <Card className="mb-8 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Filter" size={24} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽</Label>
                    <Slider
                      min={0}
                      max={50000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Длительность</Label>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любая</SelectItem>
                        <SelectItem value="short">1-3 дня</SelectItem>
                        <SelectItem value="medium">4-5 дней</SelectItem>
                        <SelectItem value="long">6+ дней</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Сложность</Label>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любая</SelectItem>
                        <SelectItem value="Легкий">Легкий</SelectItem>
                        <SelectItem value="Средний">Средний</SelectItem>
                        <SelectItem value="Сложный">Сложный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTours.map((tour, index) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      {tour.difficulty}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{tour.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Clock" size={16} />
                          <span>{tour.duration} дн.</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {tour.price.toLocaleString()} ₽
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => setSelectedTour(tour)}>
                            Подробнее
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>{tour.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <img 
                              src={tour.image}
                              alt={tour.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <p className="text-muted-foreground">{tour.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 py-4 border-y">
                              <div className="text-center">
                                <Icon name="Clock" className="mx-auto mb-2 text-primary" size={24} />
                                <div className="font-semibold">{tour.duration} дней</div>
                                <div className="text-xs text-muted-foreground">Длительность</div>
                              </div>
                              <div className="text-center">
                                <Icon name="TrendingUp" className="mx-auto mb-2 text-primary" size={24} />
                                <div className="font-semibold">{tour.difficulty}</div>
                                <div className="text-xs text-muted-foreground">Сложность</div>
                              </div>
                              <div className="text-center">
                                <Icon name="Wallet" className="mx-auto mb-2 text-primary" size={24} />
                                <div className="font-semibold">{tour.price.toLocaleString()} ₽</div>
                                <div className="text-xs text-muted-foreground">Стоимость</div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Что включено:</h4>
                              <div className="flex flex-wrap gap-2">
                                {tour.highlights.map((highlight, i) => (
                                  <Badge key={i} variant="secondary">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button className="w-full" size="lg">
                              <Icon name="Calendar" className="mr-2" size={18} />
                              Забронировать тур
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTours.length === 0 && (
              <Card className="p-12 text-center">
                <Icon name="SearchX" className="mx-auto mb-4 text-muted-foreground" size={64} />
                <h3 className="text-2xl font-bold mb-2">Туры не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры фильтров</p>
              </Card>
            )}
          </div>
        </section>

        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Красота Дагестана в фотографиях
              </p>
            </div>

            <Tabs defaultValue="landscapes" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="landscapes">Пейзажи</TabsTrigger>
                <TabsTrigger value="culture">Культура</TabsTrigger>
                <TabsTrigger value="adventure">Приключения</TabsTrigger>
              </TabsList>

              <TabsContent value="landscapes" className="animate-fade-in">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
                      <img 
                        src="https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/27e9f845-d9fa-4c9e-8a40-6129a6d7c24a.jpg"
                        alt={`Пейзаж ${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <Icon name="ZoomIn" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="culture" className="animate-fade-in">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
                      <img 
                        src="https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/e46f9660-cae2-43e0-b188-692c5c2460c1.jpg"
                        alt={`Культура ${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <Icon name="ZoomIn" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="adventure" className="animate-fade-in">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
                      <img 
                        src="https://cdn.poehali.dev/projects/0aa1dfa8-3095-4232-afcb-2b605e6ad5c7/files/d6329fe4-a638-4d05-a4f6-a1248f0a84b0.jpg"
                        alt={`Приключение ${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <Icon name="ZoomIn" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="reviews" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы путешественников</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Истории тех, кто уже побывал в Дагестане с нами
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {testimonials.map((review, index) => (
                <Card key={review.id} className="animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-4xl">{review.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription className="text-sm">{review.tour}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="fill-primary text-primary" size={16} />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Готовы к приключению? Напишите нам!
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Адрес</div>
                      <div className="text-muted-foreground">г. Махачкала, ул. Имама Шамиля, 1</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Телефон</div>
                      <div className="text-muted-foreground">+7 (928) 123-45-67</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">info@dagestan-tours.ru</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Режим работы</div>
                      <div className="text-muted-foreground">Ежедневно с 9:00 до 21:00</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="font-semibold mb-3">Социальные сети</div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon">
                        <Icon name="MessageCircle" size={20} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Send" size={20} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Instagram" size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle>Отправить сообщение</CardTitle>
                  <CardDescription>Мы ответим в течение 24 часов</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Имя</Label>
                      <Input id="contact-name" placeholder="Ваше имя" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Телефон</Label>
                      <Input id="contact-phone" type="tel" placeholder="+7 (999) 999-99-99" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Сообщение</Label>
                      <Textarea id="contact-message" placeholder="Расскажите, какое путешествие вы хотите..." rows={4} />
                    </div>

                    <Button className="w-full" size="lg">
                      <Icon name="Send" className="mr-2" size={18} />
                      Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Mountain" size={32} />
                <span className="text-2xl font-bold">Дагестан</span>
              </div>
              <p className="text-primary-foreground/80">
                Откройте для себя величие горного края и создайте незабываемые воспоминания
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Популярные туры</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Сулакский каньон</li>
                <li>Базардюзю</li>
                <li>Горные аулы</li>
                <li>Самурский лес</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Информация</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>О компании</li>
                <li>Безопасность</li>
                <li>Условия бронирования</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Подписка на новости</h3>
              <p className="text-primary-foreground/80 mb-3 text-sm">
                Получайте специальные предложения
              </p>
              <div className="flex gap-2">
                <Input placeholder="Email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60" />
                <Button variant="secondary">
                  <Icon name="ArrowRight" size={18} />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
            <p>© 2024 Дагестан Туры. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
